import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useContactFriendsStore } from "../store";
import { FriendWithVisit } from "../type/model";

const friendsQuery = () =>
  supabase
    .from("friends_latest_visit")
    .select("id, name, avatar, frequency, latest_date");

export function useFriendsData() {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<PostgrestError>();
  const friends = useContactFriendsStore((s) => s.friends);
  const setFriends = useContactFriendsStore((s) => s.setFriends);

  useEffect(() => {
    if (friends == null) {
      setFriends([]);
      setLoading(true);
      friendsQuery().then(({ data, error }) => {
        setLoading(false);
        setFriends((data as FriendWithVisit[]) ?? []);
        setError(error ?? undefined);
      });
    }
  }, [friends, setFriends]);

  return { loading, friends, error };
}