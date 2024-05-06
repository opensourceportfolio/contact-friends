import type { StateCreator } from "zustand";
import { supabase } from "../lib/supabase";
import type { Friend, FriendWithVisit } from "../type/model";

export type FriendsData = {
  friends: FriendWithVisit[] | null;
};

export type FriendsSlice = FriendsData & {
  setFriends: (fs: FriendWithVisit[]) => void;
  addFriend: (f: Omit<Friend, "id">) => Promise<Friend>;
  removeFriend: (id: number) => Promise<void>;
};

export const createFriendsSlice: StateCreator<FriendsSlice> = (set) => ({
  friends: null,
  setFriends: (friends) => set(() => ({ friends })),
  addFriend: async (friend) => {
    const response = await supabase
      .from("friends")
      .insert(friend)
      .select()
      .single();

    console.log({ response });

    if (response.error) {
      return Promise.reject(response.error);
    }

    set((s) => ({
      friends: [...(s.friends ?? []), { ...response.data, latest_date: null }],
    }));

    return response.data;
  },
  removeFriend: async (id: number) => {
    const response = await supabase.from("friends").delete().eq("id", id);

    if (response.error) {
      return Promise.reject(response.error);
    }

    set((s) => ({
      friends: s.friends?.filter((f) => f.id !== id),
    }));
  },
});
