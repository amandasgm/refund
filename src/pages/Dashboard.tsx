import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RefundItem } from "../components/RefundItem";

import lupaSvg from "../assets/search.svg";
import { CATEGORIES } from "../utils/categories";

import { useState } from "react";

const REFUND_EXEMPLE = [
  {
    id: "123",
    name: "Amanda",
    category: "Hospedagem",
    amount: "R$524,90",
    categoryImage: CATEGORIES["accommodation"].icon,
  },
  

];

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
        className="flex flex-1 items-center justify-between border-b-[1px] border-b-gray-400 md:flex-row pb-8 gap-2 mt-6"
      >
        <Input
          placeholder="pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="icon">
          <img src={lupaSvg} alt="" />
        </Button>
      </form>
      <div className="flex flex-col gap-4 my-4 max-h-[342px] overflow-y-scroll">
        {REFUND_EXEMPLE.map((item) => (
          <RefundItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
