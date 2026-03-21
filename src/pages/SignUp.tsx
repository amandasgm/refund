import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";
import { useNavigate } from "react-router";

import { useState } from "react";

// validação -------------------------------------------------------------------------------
const signUpSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Informe o nome" }),
    email: z.string().email({ message: "Email invalido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 digitos" }),
    confirmPassword: z.string({ message: "Confirme a senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // senhas iguais
    message: "As senhas não sao iguais",
    path: ["confirmPassword"],
  });

// SignUp ----------------------------------------------------------------------------------
export function SignUp() {
  // state 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  // quando clicar em enviar 
  async function onSend(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      // validando dados
      const data = signUpSchema.parse({
        name,
        email,
        password,
        confirmPassword,
      });

      // criando usuario
      await api.post("/users", data);
      if (confirm("Cadastrado com sucesso. Ir para a tela de entrar?")) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }
      alert("Nao foi possivel cadastrar");
    } finally {
      setIsLoading(false);
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
