import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useState } from "react";

export function SignUp() {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // quando clicar em enviar
  function onSend(e: React.SyntheticEvent) {
    e.preventDefault();

    if (password === confirmPassword) {
      console.log(name, email, password);
    } else {
      alert("As senhas nao coincidem");
    }
  }

  // html
  return (
    <form onSubmit={onSend} className="w-full flex flex-col gap-4">
      <Input
        legend="NOME"
        required
        placeholder="Fulaninho de Tal"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        legend="E-MAIL"
        required
        type="email"
        placeholder="********"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        legend="SENHA"
        required
        type="password"
        placeholder="********"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        legend="CONFIRME A SENHA"
        required
        type="password"
        placeholder="********"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button type="submit" children="Cadastrar" isLoading={isLoading} />
      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10  mb-4 text-center hover:text-green-800 transition easy-linear"
      >
        Ja tenho uma conta
      </a>
    </form>
  );
}
