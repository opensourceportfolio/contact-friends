import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { StateCreator } from "zustand";
import { supabase } from "../lib/supabase";
import { Friend, Profile, Visit } from "../type/model";

export type VisitsData = {
  visits: Visit[] | null;
};

export type VisitsSlice = VisitsData & {
  setVisits: (vs: Visit[]) => void;
  addVisit: (date: Date, friend: Friend) => Promise<Visit>;
  removeVisit: (id: number) => Promise<void>;
};

export const createVisitsSlice: StateCreator<VisitsSlice> = (set) => ({
  visits: null,
  setVisits: (visits) => set(() => ({ visits })),
  addVisit: async (date, friend) => {
    const newVisit: Omit<Visit, "id"> = {
      date: date.toISOString(),
      friend: friend.id,
    };
    const response = await supabase
      .from("visits")
      .insert(newVisit)
      .select()
      .single();

    console.log({ response });

    if (response.error) {
      return Promise.reject(response.error);
    }

    set((s) => ({
      visits: [...(s.visits ?? []), response.data],
    }));

    return response.data;
  },
  removeVisit: async (id: number) => {
    const response = await supabase.from("visits").delete().eq("id", id);
    if (response.error) {
      return Promise.reject(response.error);
    }
    set((s) => ({
      visits: s.visits?.filter((v) => v.id !== id),
    }));
  },
});
