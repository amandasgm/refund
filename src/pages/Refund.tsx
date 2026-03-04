import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";

import { useState } from "react";
import { useNavigate } from "react-router";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";

export function Refund() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [filename, setFilename] = useState<File | null>(null);
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate()

  function onSend(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log(name, price, category, filename);
    navigate("/confirm", {state: {fromSubmit: true}}) // somente pode navegar atraves do submit, e nao colocando diretamente na url
  }

  return (
    <form
      onSubmit={onSend}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados de despesa para solicitar reembolso
        </p>
      </header>
      <div>
        <Input
          legend="nome da solicitação"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex  gap-4 ">
          <Select
            required
            legend="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES_KEYS.map((category) => (
              <option key={category} value={category}>
                {CATEGORIES[category].name}
              </option>
            ))}
          </Select>
          <Input
            legend="valor"
            required
            type="number"
            placeholder="R$0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <Upload
          filename={filename && filename.name} // verifica se tem filename, se tiver (&&) pega o nome de filename
          onChange={(e) => e.target.files && setFilename(e.target.files[0])}
        />
        <Button isLoading={isLoading} type="submit" children="Enviar" />
      </div>
    </form>
  );
}
