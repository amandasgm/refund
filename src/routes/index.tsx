import { Loading } from "../components/Loading";

import { useAuth } from "../hooks/useAuth";

import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./MenagerRoutes";


export function Routes() {
  const { session, isLoading } = useAuth()

  function LogicRoute() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />;
      case "manager":
        return <ManagerRoutes />;

      default:
        return <AuthRoutes />;
    }
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <LogicRoute />
    </BrowserRouter>
  );
}
