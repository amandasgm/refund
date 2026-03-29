import { useState, useEffect } from "react";
import { createContext, type ReactNode } from "react";
import { api } from "../services/api";

// tipagem da sessao
type AuthContext = {
  isLoading: boolean
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void
  remove: () => void
};

// persistindo login
const LOCAL_STORAGE_KEY = "@refund"

export const AuthContext = createContext({} as AuthContext);

// provider do context
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true)

  // salva a sessao no localStorage e no state
  function save(data: UserAPIResponse){
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}` // seta o token no header de todas as requisicoes do api
    setSession(data)
  }

  function remove(){
    setSession(null)
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

    window.location.assign("/")
  }

  // carrega a sessao do localStorage para o state, caso exista
  function loadUser(){
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

    if(token && user){
      api.defaults.headers.common["Authorization"] = `Bearer ${token}` // seta o token no header de todas as requisicoes do api
      setSession({
        token, 
        user: JSON.parse(user)
      })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadUser()
  },[])

  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>{children}</AuthContext.Provider>
  );
}
