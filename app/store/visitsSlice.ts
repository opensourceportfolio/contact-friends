import type { StateCreator } from "zustand";
import type { State } from ".";
import { supabase } from "../lib/supabase";
import { latestVisitDate } from "../model/visit";
import type { FriendWithVisit, Visit } from "../type/model";

export type VisitsData = {
  visits: Record<number, Visit[]> | null;
};

export type VisitsSlice = VisitsData & {
  setVisits: (friendId: number, vs: Visit[]) => void;
  addVisit: (date: Date, friend: FriendWithVisit) => Promise<Visit>;
  removeVisit: (friendId: number, visitId: number) => Promise<void>;
  updateVisit: (friendId: number, visit: Visit) => Promise<void>;
};

export const createVisitsSlice: StateCreator<State, [], [], VisitsSlice> = (
  set,
  get
) => {
  function setFriendVisits(friend: FriendWithVisit, friendVisits: Visit[]) {
    return set((s) => {
      return {
        visits: { ...get().visits, [friend.id]: friendVisits },
        friends: s.friends?.map((f) => {
          const nextFriend: FriendWithVisit =
            f.id === friend.id
              ? {
                  ...friend,
                  latest_date: latestVisitDate(friendVisits),
                }
              : f;

          return nextFriend;
        }),
      };
    });
  }

  return {
    visits: null,

    setVisits: (friendId, visits) =>
      set((s) => ({ visits: { ...s.visits, [friendId]: visits } })),

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

      const nextVisit: Visit = response.data;

      const friendVisits: Visit[] =
        get().visits?.[friend.id].concat(nextVisit) ?? [];

      setFriendVisits(friend, friendVisits);

      return nextVisit;
    },

    removeVisit: async (friendId: number, visitId: number) => {
      const response = await supabase
        .from("visits")
        .update({ deleted: true })
        .eq("id", visitId);

      if (response.error) {
        console.log(response);
        return Promise.reject(response.error);
      }

      const visit = get().visits?.[friendId].find((v) => v.id === visitId);
      const friend = get().friends?.find((f) => f.id === visit?.friend);

      if (visit == null || friend == null) {
        return Promise.reject("Invalid visit for a friend");
      }

      const remainingVisits =
        get().visits?.[friendId].filter((v) => v.id !== visit.id) ?? [];

      return setFriendVisits(friend, remainingVisits);
    },

    updateVisit: async (friendId: number, updatedVisit: Visit) => {
      const friend = get().friends?.find((f) => f.id === updatedVisit?.friend);

      if (friend == null) {
        return Promise.reject("Invalid friend for visit");
      }

      const response = await supabase
        .from("visits")
        .update({ date: updatedVisit.date })
        .eq("id", updatedVisit.id);

      get().log({ op: "updateVisit", response });

      if (response.error) {
        return Promise.reject(response.error);
      }

      const updatedVisits =
        get().visits?.[friendId]?.map((v) =>
          v.id === updatedVisit.id ? updatedVisit : v
        ) ?? [];

      return setFriendVisits(friend, updatedVisits);
    },
  };
};
