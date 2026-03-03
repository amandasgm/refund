import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useState } from "react";

export function DashBoard() {
  const [name, setName] = useState("");

  function fetchRefund(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(name);
  }

  return (
    <div className="bg-gray-500 rounded-xl p-10">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

      <form
        onSubmit={fetchRefund}
        className="flex flex-1 items-center justify-between border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Button children="Teste"/>
      </form>
    </div>
  );
}
