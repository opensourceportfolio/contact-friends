import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useContactFriendsStore } from "../store";

const query = () =>
  supabase.from("friends").select("id, name, avatar, frequency");

export function useUserData() {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<PostgrestError>();
  const friends = useContactFriendsStore((s) => s.friends);
  const setFriends = useContactFriendsStore((s) => s.setFriends);

  useEffect(() => {
    if (friends == null) {
      setFriends([]);
      setLoading(true);
      query().then(({ data, error }) => {
        setLoading(false);
        setFriends(data ?? []);
        setError(error ?? undefined);
      });
    }
  }, [friends, setFriends]);

  return { loading, friends, error };
}
