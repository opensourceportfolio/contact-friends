import type { StateCreator } from "zustand";
import type { State } from ".";

type UserSliceData = {
  userId: null | string;
};

export type UserSlice = UserSliceData & {
  setUserId: (userId: string | null) => void
  logout: () => void
}

export const createUsersSlice: StateCreator<State, [], [], UserSlice> = (
  set,
) => ({
  userId: null,

  setUserId(userId: string | null) {
    set({
      userId,
    });
  },

  logout() {
    set({
      userId: null,
      visits: null,
      friends: null,
    })
  },
});
