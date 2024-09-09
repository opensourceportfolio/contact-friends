import type { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useContactFriendsStore } from "../store";

type SessionState =
  | { session: Session; loading: false }
  | { session: null; loading: true }
  | { session: null; loading: false; error?: Error };

type SessionProviderProps = { children: React.ReactNode };

const initialState = {
  session: null,
  loading: false,
} satisfies SessionState;

export const SessionContext = createContext<SessionState>(initialState);

export function SessionProvider({ children }: SessionProviderProps) {
  const [state, setState] = useState<SessionState>(initialState);
  const setUserId = useContactFriendsStore(s => s.setUserId)

  useEffect(() => {
    setState({
      ...initialState,
      loading: true,
    });

    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          setState({
            ...initialState,
            error,
          });
        } else if (session) {
          setState({
            ...initialState,
            session: session,
          });
          setUserId(session.user.id)
        }
      })
      .catch((reason) => {
        if (reason instanceof Error) {
          setState({
            ...initialState,
            error: reason,
          });
        }
      });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("auth state change for email: ", session?.user.email);
      setState({
        ...initialState,
        session,
      });
    });
  }, [setUserId]);

  return (
    <SessionContext.Provider value={state}>{children}</SessionContext.Provider>
  );
}
