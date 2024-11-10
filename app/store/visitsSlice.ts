import type { StateCreator } from "zustand";
import type { State } from ".";
import { supabase } from "../lib/supabase";
import { maxDate } from "../model/frequency";
import { latestVisitDate } from "../model/visit";
import type { Friend, FriendWithVisit, Visit } from "../type/model";

export type VisitsData = {
  visits: Visit[] | null;
};

export type VisitsSlice = VisitsData & {
  setVisits: (vs: Visit[]) => void;
  addVisit: (date: Date, friend: Friend) => Promise<Visit>;
  removeVisit: (id: number) => Promise<void>;
  updateVisit: (visit: Visit) => Promise<void>;
};

export const createVisitsSlice: StateCreator<State, [], [], VisitsSlice> = (
  set,
  get,
) => ({
  visits: null,

  setVisits: (visits) => set(() => ({ visits })),

  addVisit: async (date, friend) => {
    const isoDate = date.toISOString();
    const newVisit: Omit<Visit, "id"> = {
      date: isoDate,
      friend: friend.id,
    };
    const response = await supabase
      .from("visits")
      .insert(newVisit)
      .select()
      .single();

    get().log({ response, newVisit });

    if (response.error) {
      return Promise.reject(response.error);
    }

    set((s) => ({
      visits: (s.visits ?? []).concat(response.data),
      friends: s.friends?.map((f) => {
        const nextFriend: FriendWithVisit =
          f.id === friend.id
            ? {
                ...friend,
                latest_date: maxDate(f.latest_date, isoDate),
              }
            : f;

        return nextFriend;
      }),
    }));

    return response.data;
  },

  removeVisit: async (id: number) => {
    const response = await supabase
      .from("visits")
      .update({ deleted: true })
      .eq("id", id);

    if (response.error) {
      return Promise.reject(response.error);
    }

    const visit = get().visits?.find((v) => v.id === id);
    const friend = get().friends?.find((f) => f.id === visit?.friend);

    if (visit == null || friend == null) {
      return Promise.reject("Invalid visit for a friend");
    }

    const remainingVisits =
      get().visits?.filter((v) => v.id !== visit.id) ?? [];

    set((s) => {
      return {
        visits: remainingVisits,
        friends: s.friends?.map((f) => {
          const nextFriend: FriendWithVisit =
            f.id === friend.id
              ? {
                  ...friend,
                  latest_date: latestVisitDate(remainingVisits),
                }
              : f;

          return nextFriend;
        }),
      };
    });
  },
  updateVisit: async (visit: Visit) => {
    const response = await supabase
      .from("visits")
      .update({ date: visit.date })
      .eq("id", visit.id);

    get().log({ op: "updateVisit", response });

    if (response.error) {
      return Promise.reject(response.error);
    }

    const updatedVisits =
      get().visits?.map((v) => (v.id === visit.id ? visit : v)) ?? [];
    const friend = get().friends?.find((f) => f.id === visit?.friend);

    if (friend == null) {
      return Promise.reject("Invalid friend for visit");
    }

    set((s) => ({
      visits: updatedVisits,
      friends: s.friends?.map((f) => {
        const nextFriend: FriendWithVisit =
          f.id === friend.id
            ? {
                ...friend,
                latest_date: latestVisitDate(updatedVisits),
              }
            : f;

        return nextFriend;
      }),
    }));
  },
});
