import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
  return (
    <form className="w-full flex flex-col gap-4">
      <Input
        legend="email"
        required
        type="email"
        placeholder="seuemail@gmail.com"
      />
      <Input legend="senha" required type="password" placeholder="********" />

      <Button children="Entrar" />
      <Button children="Criar conta" bg="without" />
    </form>
  );
}
