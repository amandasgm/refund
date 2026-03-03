import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./MenagerRoutes";

export function Routes(){
  return(
    <BrowserRouter>
      <ManagerRoutes />
      
    </BrowserRouter>
  )
}