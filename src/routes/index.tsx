import { Loading } from "../components/Loading";

import { useAuth } from "../hooks/useAuth";

import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./MenagerRoutes";

const isLoading = false;

const session = {
  user: {
    role: "",
  },
};

export function Routes() {
  const context = useAuth()
  console.log(context.session)

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
