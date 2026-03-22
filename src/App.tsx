import { Routes } from "./routes";
import { AuthContext } from "./context/AuthContext";

export function App() {
  return (
    <AuthContext.Provider value={{name: "Amanda Santana"}}>
      <Routes />
    </AuthContext.Provider>
  );
}
