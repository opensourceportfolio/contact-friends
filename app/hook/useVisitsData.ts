import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useContactFriendsStore } from "../store";
import { FriendWithVisit, Visit } from "../type/model";

const visitsQuery = (id: number) =>
  supabase.from("visits").select("*").eq("friend", id);

export function useVisitsData(friendId: number) {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<PostgrestError>();
  const visits = useContactFriendsStore((s) => s.visits);
  const setVisits = useContactFriendsStore((s) => s.setVisits);

  useEffect(() => {
    setVisits([]);
    setLoading(true);
    visitsQuery(friendId).then(({ data, error }) => {
      setLoading(false);
      setVisits(data ?? []);
      setError(error ?? undefined);
    });
  }, [friendId, setVisits]);

  return { loading, visits, error };
}
