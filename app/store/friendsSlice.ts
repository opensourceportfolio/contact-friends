import type { StateCreator } from "zustand";
import { supabase } from "../lib/supabase";
import type { Friend, FriendWithVisit } from "../type/model";
import type { VisitsSlice } from "./visitsSlice";

export type FriendsData = {
  friends: FriendWithVisit[] | null;
};

export type FriendsSlice = FriendsData & {
  setFriends: (fs: FriendWithVisit[]) => void;
  addFriend: (f: Omit<Friend, "id">) => Promise<Friend>;
  removeFriend: (id: number) => Promise<void>;
  updateFriend: (friend: FriendWithVisit) => Promise<void>;
  resetFriends: () => void;
};

export const createFriendsSlice: StateCreator<
  VisitsSlice & FriendsSlice,
  [],
  [],
  FriendsSlice
> = (set) => ({
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
    const response = await supabase
      .from("friends")
      .update({ deleted: true })
      .eq("id", id);

    console.log({ id, response }, "removeFriend");

    if (response.error) {
      return Promise.reject(response.error);
    }

    set((s) => ({
      friends: s.friends?.filter((f) => f.id !== id),
    }));
  },

  updateFriend: async (friend: FriendWithVisit) => {
    const response = await supabase
      .from("friends")
      .update({
        avatar: friend.avatar,
        name: friend.name,
        frequency: friend.frequency,
      })
      .eq("id", friend.id);

    console.log(friend, { response }, "updateFriend");

    if (response.error) {
      return Promise.reject(response.error);
    }

    set((s) => ({
      ...s,
      friends: s.friends?.map((f) => (f.id === friend.id ? friend : f)),
    }));
  },

  resetFriends: () => {
    set({
      friends: [],
      visits: []
    });
  },
});
