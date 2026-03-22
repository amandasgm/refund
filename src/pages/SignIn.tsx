import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { api } from "../services/api"
import { AxiosError } from "axios"
import { useAuth } from "../hooks/useAuth";

import { z, ZodError } from "zod";

import { useActionState } from "react"; // para lidar com o estado de uma acao

const signInSchema = z.object({
  email: z.string().email({ message: "Email invalido"}),
  password: z.string().trim().min(1, {message: "Informe a senha"})
})

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(onSend, null)

  const auth = useAuth()

  // quando clicar em enviar
  async function onSend(_: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password")
      })
  
      const response = await api.post("/sessions", data)
      auth.save(response.data)

    } catch (error) {
      if(error instanceof ZodError){
        return {message: error.issues[0].message}
      }

      if(error instanceof AxiosError){
        return {message: error.response?.data.message}
      }
      return {message: "Não foi possivel acessar"}
    }
    // tudo que é retornado aqui, fica dentro do state
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
      />
      <Input
        name="password"
        legend="senha"
        required
        type="password"
        placeholder="********"
      /> 
      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>

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
