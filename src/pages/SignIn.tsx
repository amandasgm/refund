import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useActionState } from "react"; // para lidar com o estado de uma acao

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(onSend, {
    email: "amanda@gmail.com",
    password: "123",
  });

  // quando clicar em enviar
  function onSend(prevState: any, formData: FormData) {
    console.log(formData.get("email"));
  }

  // html
  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        legend="email"
        required
        type="email"
        placeholder="seuemail@gmail.com"
        defaultValue={state.email}
      />
      <Input
        name="password"
        legend="senha"
        required
        type="password"
        placeholder="********"
      />

      <Button type="submit" children="Entrar" isLoading={isLoading} />
      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-10  mb-4 text-center hover:text-green-800 transition easy-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
