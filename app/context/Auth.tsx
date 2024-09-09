import * as LocalAuthentication from "expo-local-authentication";
import { createContext, useEffect, useState } from "react";

type AuthState = { authenticated: boolean };

type AuthProviderProps = { children: React.ReactNode };

const initialState = {
  authenticated: true,
} satisfies AuthState;

export const AuthContext = createContext<AuthState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);

  useEffect(() => {
    async function authenticate() {
      const result = await LocalAuthentication.authenticateAsync();
      setState({ authenticated: result.success });
    }

    authenticate();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
