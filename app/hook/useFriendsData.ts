import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useContactFriendsStore } from "../store";
import type { FriendWithVisit } from "../type/model";

const friendsQuery = () =>
  supabase
    .from("friends_latest_visit")
    .select("id, name, avatar, frequency, latest_date");

export function useFriendsData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<PostgrestError>();
  const friends = useContactFriendsStore((s) => s.friends);
  const setFriends = useContactFriendsStore((s) => s.setFriends);
  const addFriend = useContactFriendsStore((s) => s.addFriend);
  const removeFriend = useContactFriendsStore((s) => s.removeFriend);
  const log = useContactFriendsStore((s) => s.log);
  
  useEffect(() => {
    if (friends == null) {
      setFriends([]);
      setLoading(true);
      friendsQuery().then(({ data, error }) => {
        log({ data, error });
        setFriends((data as FriendWithVisit[]) ?? []);
        setError(error ?? undefined);
        setLoading(false);
      });
    }
  }, [friends, setFriends]);

  return { loading, friends, error, setFriends, addFriend, removeFriend };
}
