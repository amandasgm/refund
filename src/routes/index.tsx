import { Loading } from "../components/Loading";

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
