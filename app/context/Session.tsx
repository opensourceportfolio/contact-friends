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
  const setUser = useContactFriendsStore((s) => s.setUser);
  const user = useContactFriendsStore((s) => s.user);
  const log = useContactFriendsStore((s) => s.log);

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
          setUser(session.user);
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

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        log(
          `auth state change for email: ${session?.user.email ?? "<no user email>"}. New state: ${event}`
        );
        setState({
          ...initialState,
          session,
        });
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={state}>{children}</SessionContext.Provider>
  );
}
