import { create } from "zustand";
import { SessionSlice, createSessionSlice } from "./sessionSlice";
import { UserSlice, createUserSlice } from "./userSlice";

type State = SessionSlice & UserSlice;

export const useContactFriendsStore = create<State>((...a) => ({
	...createSessionSlice(...a),
	...createUserSlice(...a),
}));
