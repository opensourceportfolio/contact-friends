import { Session } from "@supabase/supabase-js";
import { StateCreator } from "zustand";
import { Database } from "../lib/database.types";
import { Friend } from "../type/model";

export type UserSlice = {
	friends: Friend[];
	setFriends: (fs: Friend[]) => void;
};

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
	friends: [],
	setFriends: (fs) => set(() => ({ friends: fs })),
});
