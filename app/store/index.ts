import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type FriendsSlice, createFriendsSlice } from "./friendsSlice";
import { type VisitsSlice, createVisitsSlice } from "./visitsSlice";

type State = FriendsSlice & VisitsSlice;

export const useContactFriendsStore = create<State>()(
  devtools((...a) => ({
    ...createFriendsSlice(...a),
    ...createVisitsSlice(...a),
  }))
);
