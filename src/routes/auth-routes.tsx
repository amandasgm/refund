import { Routes, Route } from "react-router"
import { SignIn } from "../pages/SingIn"

export function AuthRoutes(){
  return(
    <Routes>
      <Route path="/" element={<SignIn/>}/>
    </Routes>
  )
}
