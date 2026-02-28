import { Routes, Route } from "react-router";

import { SignIn } from "../pages/SingIn";
import { AuthLayout } from "../components/AuthLayout";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
      </Route>
    </Routes>
  );
}
