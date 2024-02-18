import { useEffect, useState } from "react";
import { useContactFriendsStore } from "../store";
import { supabase } from "../lib/supabase";

export function useSession() {
  const session = useContactFriendsStore((s) => s.session);
  const setSession = useContactFriendsStore((s) => s.setSession);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setLoading(false);
      if (session) {
        setSession(session);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(false);
      if (session) {
        setSession(session);
      }
    });
  }, [setSession]);

  return { session, loading };
}
