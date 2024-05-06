import type { StateCreator } from "zustand";
import { supabase } from "../lib/supabase";
import { maxDate } from "../model/frequency";
import { latestVisitDate } from "../model/visit";
import type { Friend, FriendWithVisit, Visit } from "../type/model";
import type { FriendsSlice } from "./friendsSlice";

export type VisitsData = {
  visits: Visit[] | null;
};

export type VisitsSlice = VisitsData & {
  setVisits: (vs: Visit[]) => void;
  addVisit: (date: Date, friend: Friend) => Promise<Visit>;
  removeVisit: (id: number) => Promise<void>;
};

export const createVisitsSlice: StateCreator<
  VisitsSlice & FriendsSlice,
  [],
  [],
  VisitsSlice
> = (set, get) => ({
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

    console.log({ response, newVisit });

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
    const response = await supabase.from("visits").delete().eq("id", id);

    console.log({ response }, "removeVisit");

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
});
