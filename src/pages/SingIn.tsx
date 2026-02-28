import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useState } from "react";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSend(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(email, password)
  }

  return (
    <form onSubmit={onSend} className="w-full flex flex-col gap-4">
      <Input
        legend="email"
        required
        type="email"
        placeholder="seuemail@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        legend="senha"
        required
        type="password"
        placeholder="********"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" children="Entrar" isLoading={isLoading}/>
      <Button children="Criar conta" bg="without" />
    </form>
  );
}
