import type { StateCreator } from "zustand";
import type { State } from ".";
import { User } from "@supabase/supabase-js";

type UserSliceData = {
  user: User | null;
};

export type UserSlice = UserSliceData & {
  setUser: (user: User | null) => void
  logout: () => void
}

export const createUsersSlice: StateCreator<State, [], [], UserSlice> = (
  set,
) => ({
  user: null, 

  setUser(user: User | null) {
    set({
      user,
    });
  },

  logout() {
    set({
      user: null,
      visits: null,
      friends: null,
    })
  },
});
