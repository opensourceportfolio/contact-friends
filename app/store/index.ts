import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type FriendsSlice, createFriendsSlice } from "./friendsSlice";
import { createUsersSlice, type UserSlice } from "./userSlice";
import { type VisitsSlice, createVisitsSlice } from "./visitsSlice";
import { createLogsSlice, LogsSlice } from "./logSlice";

export type State = UserSlice & FriendsSlice & VisitsSlice & LogsSlice;

export const useContactFriendsStore = create<State>()(
  devtools((...a) => ({
    ...createUsersSlice(...a),
    ...createFriendsSlice(...a),
    ...createVisitsSlice(...a),
    ...createLogsSlice(...a),
  })),
);
