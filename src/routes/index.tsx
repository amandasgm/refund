import { Loading } from "../components/Loading";

import { BrowserRouter } from "react-router";
import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./MenagerRoutes";

const isLoading = true

export function Routes(){

  if(isLoading){
    return <Loading/>
  }
  return(
    <BrowserRouter>
      <AuthRoutes />
      
    </BrowserRouter>
  )
}