import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import fileSvg from "../assets/file.svg";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";

// O useParams é um hook do React Router que serve para pegar parâmetros da URL dentro de um componente React.
// Ou seja, quando você tem uma rota dinâmica, tipo um ID na URL, o useParams permite ler esse valor no componente.

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";

const refundSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Informe um nome claro para a solicitação" }),
  category: z.string().min(1, { message: "Selecione uma categoria" }),
  amount: z.coerce
    .number({ message: "Valor invalido" })
    .positive({ message: "O valor deve ser positivo" }),
});

export function Refund() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  // faz a formtacao da moeda price para real brasileiro, usando a API Intl.NumberFormat
  function formatCurrency(value: string) {
    const onlyNumbers = value.replace(/\D/g, "");
    const numberValue = Number(onlyNumbers);
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedValue = formatCurrency(e.target.value);
    setPrice(formattedValue);
  }

  // IMPORTANT
  async function onSend(e: React.SyntheticEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsloading(true);
      if (!file) {
        return alert("Envie um comprovante de pagamento");
      }
      const fileUploadForm = new FormData();
      fileUploadForm.append("file", file);

      const response = await api.post("/uploads", fileUploadForm);

      const numericPrice = Number(
        price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
      );
      const data = refundSchema.parse({
        name,
        category,
        amount: numericPrice,
      });

      await api.post("/refunds", {
        ...data,
        filename: response.data.filename,
      });
      navigate("/confirm", { state: { fromSubmit: true } }); // somente pode navegar atraves do submit, e nao colocando diretamente na url
    } catch (error) {
      console.log(error);
      // erro de validacao
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      // erro mais generico, que pode ser de rede, servidor, etc
      if (error instanceof AxiosError) {
        console.log(error.response);
        return alert(error.response?.data.message);
      }
      alert("Nao foi possivel realizar a solicitação de reembolso");
    } finally {
      setIsloading(false);
    }
  }

  async function fetchRefund(id: string) {
    try {
      const response = await api.get<RefundApiResponse>(`/refunds/${id}`);
      const { name, category, amount } = response.data;
      setName(name);
      setCategory(category);
      setPrice(formatCurrency(amount.toString()));
      setFileUrl(response.data.filename);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        alert(
          error.response?.data.message ||
            "Nao foi possivel carregar os dados da solicitação",
        );
      }
    }
  }
  useEffect(() => {
    if (params.id) {
      fetchRefund(params.id);
    }
  }, [params.id]);

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
          disabled={!!params.id} // disabilita a opcao de edicao
        />
        <div className="flex  gap-4 ">
          <Select
            required
            legend="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!!params.id}
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
            type="text"
            placeholder="R$0,00"
            value={price}
            onChange={handlePriceChange}
            disabled={!!params.id}
          />
        </div>
        {params.id && fileUrl ? (
          <>
            <button
              type="button"
              onClick={() => setIsReceiptOpen(true)}
              className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear w-full"
            >
              <img src={fileSvg} alt="" />
              Abrir comprovante
            </button>

            {isReceiptOpen && (
              <div
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setIsReceiptOpen(false)}
              >
                <div
                  className="bg-white rounded-xl shadow-lg max-w-3xl w-full h-[80vh] relative overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setIsReceiptOpen(false)}
                    className="absolute top-3 right-3 bg-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-300"
                  >
                    X
                  </button>

                  <iframe
                    src={`http://localhost:3333/uploads/${fileUrl}`}
                    className="w-full h-full rounded-xl"
                    title="Comprovante"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <Upload
            filename={file && file.name} // verifica se tem file, se tiver (&&) pega o nome de file
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
          />
        )}

        <Button
          isLoading={isLoading}
          type="submit"
          children={params.id ? "Voltar" : "Enviar"}
          variant="base"
        />
      </div>
    </form>
  );
}
