import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { StateCreator } from "zustand";
import { supabase } from "../lib/supabase";
import { Friend, Profile } from "../type/model";

export type FriendsData = {
  friends: Friend[] | null;
};

export type FriendsSlice = FriendsData & {
  setFriends: (fs: Friend[]) => void;
  addFriend: (f: Omit<Friend, "id">) => Promise<Friend>;
  removeFriend: (id: number) => Promise<void>;
};

export const createFriendsSlice: StateCreator<FriendsSlice> = (set) => ({
  friends: null,
  setFriends: (friends) => set(() => ({ friends })),
  addFriend: (friend) => {
    return Promise.resolve(
      supabase
        .from("friends")
        .insert(friend)
        .select()
        .single()
        .then((response) => {
          console.log({ response });
          if (response.error) {
            return Promise.reject(response.error);
          }
          set((s) => ({
            friends: [...(s.friends ?? []), response.data],
          }));
          return response.data;
        }),
    );
  },
  removeFriend: (id: number) => {
    return Promise.resolve(supabase.from("friends").delete().eq("id", id)).then(
      (response) => {
        if (response.error) {
          return Promise.reject(response.error);
        }
        set((s) => ({
          friends: s.friends?.filter((f) => f.id !== id),
        }));
      },
    );
  },
});
