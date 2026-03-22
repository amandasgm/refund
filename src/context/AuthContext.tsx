import { useState } from "react";
import { createContext, type ReactNode } from "react";

// tipagem da sessao
type AuthContext = {
  session: null | UserAPIResponse;
};

export const AuthContext = createContext({} as AuthContext);

// provider do context
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}
