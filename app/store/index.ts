import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type FriendsSlice, createFriendsSlice } from "./friendsSlice";
import { createUsersSlice, type UserSlice } from "./userSlice";
import { type VisitsSlice, createVisitsSlice } from "./visitsSlice";

export type State = UserSlice & FriendsSlice & VisitsSlice;

export const useContactFriendsStore = create<State>()(
  devtools((...a) => ({
    ...createUsersSlice(...a),
    ...createFriendsSlice(...a),
    ...createVisitsSlice(...a),
  })),
);
