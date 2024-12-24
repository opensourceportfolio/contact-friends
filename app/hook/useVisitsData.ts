import type { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useContactFriendsStore } from "../store";

const visitsQuery = (id: number) =>
  supabase
    .from("visits")
    .select("*")
    .filter("deleted", "eq", false)
    .eq("friend", id);

export function useVisitsData(friendId: number) {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<PostgrestError>();
  const visits = useContactFriendsStore((s) => s.visits?.[friendId]);
  const setVisits = useContactFriendsStore((s) => s.setVisits);
  const removeVisit = useContactFriendsStore((s) => s.removeVisit);
  const addVisit = useContactFriendsStore((s) => s.addVisit);

  
  useEffect(() => {
    if (visits == null) {
      setVisits(friendId, []);
      setLoading(true);
      console.log("useVisitsData", {friendId})
      visitsQuery(friendId).then(({ data, error }) => {
        setLoading(false);
        setVisits(friendId, data ?? []);
        setError(error ?? undefined);
      });
    }
  }, [visits, friendId, setVisits]);

  return { loading, visits, error, setVisits, addVisit, removeVisit };
}
