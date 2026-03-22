import { useState } from "react"
import { createContext, type ReactNode } from "react";

// tipagem da sessao
type AuthContext = {
  session: null | UserAPIResponse
}

export const AuthContext = createContext({});

// provider do context
export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{ name: "Amanda Santana" }}>
      {children}
    </AuthContext.Provider>
  );
}
