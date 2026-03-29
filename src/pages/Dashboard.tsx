import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RefundItem } from "../components/RefundItem";
import { formatCurrency } from "../utils/formatCurrency";
import { Pagination } from "../components/Paginations";

import { api } from "../services/api";
import { AxiosError } from "axios";

import type { RefundItemProps } from "../components/RefundItem";

import lupaSvg from "../assets/search.svg";
import { CATEGORIES } from "../utils/categories";

import { useState, useEffect, type Ref } from "react";

const REFUND_EXEMPLE = [
  {
    id: "123",
    name: "Amanda",
    category: "Hospedagem",
    amount: formatCurrency(34.5),
    categoryImage: CATEGORIES["accommodation"].icon,
  },
];

const PER_PAGE = 5;

export function DashBoard() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalOfPage, setTotalOfPages] = useState(10);
  const [refunds, setRefunds] = useState<RefundItemProps[]>(REFUND_EXEMPLE);

  async function fetchRefund() {
    try {
      const response = await api.get<RefundsPaginationAPIResponse>(
        `/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return alert(
          error.response?.data.message || "Erro ao buscar reembolsos",
        );
      } else {
        alert("Erro ao buscar reembolsos");
      }
    }
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalOfPage) {
        return prevPage + 1;
      }
      if (action === "previous" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  }

  useEffect(() => {
    fetchRefund();
  }, []);

  return (
    <div className="bg-gray-500 rounded-xl p-10">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

      <form
        onSubmit={fetchRefund}
        className="flex flex-1  justify-between border-b-[1px] border-b-gray-400 md:flex-row pb-8 gap-2 mt-6"
      >
        <Input
          placeholder="pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="icon">
          <img src={lupaSvg} alt="" />
        </Button>
      </form>
      <div className="flex flex-col gap-4 my-6 max-h-[342px] overflow-y-scroll">
        {REFUND_EXEMPLE.map((item) => (
          <RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />
        ))}
      </div>

      <Pagination
        current={page}
        total={totalOfPage}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </div>
  );
}
