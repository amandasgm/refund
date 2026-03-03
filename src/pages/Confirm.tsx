import { Button } from "../components/Button"

import { Navigate, useNavigate, useLocation } from "react-router"

import approvedIcon from "../assets/approved.svg"

export function Confirm(){
  const navigate = useNavigate()
  const location = useLocation()

  // Confirma que a pagina so pode ser acessada pelo envio do formulario en Refund.tsx
  if(!location.state?.fromSubmit){
    return <Navigate to="/"/>
  }

  function Back(){
    navigate("/")
  }

  return (
    <div className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-green-100 font-semibold">Solicitação enviada!</h1>
        <img src={approvedIcon} alt="" className="w-30 h-30"/>
        <p className="text-center text-gray-200">Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você.</p>
      </div>
      <Button onClick={Back} children="Nova solicitação"/>

    </div>
  )
}