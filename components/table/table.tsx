import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useFormSubmissions } from "../hooks/useSubmitsWp";
import { columns } from "./data";

const RenderCell = ({ reclamacao, columnKey }: any) => {
  let value = reclamacao.main.value;

  if (columnKey === "created_at") {
    const date = parseISO(reclamacao.created_at);
    value = format(date, "dd/MM/yyyy");
  }

  if (columnKey === "referer_title") {
    value = reclamacao.referer_title;
  }

  if (columnKey === "id") {
    value = reclamacao.id;
  }

  return <span>{value}</span>;
};

export function TableWrapper() {
  const router = useRouter();
  const { data: reclamacoes } = useFormSubmissions();

  return (
    <Table aria-label="Tabela de Reclamações" selectionMode="single">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {reclamacoes?.data?.map((reclamacao: any) => (
          <TableRow key={reclamacao.id}>
            {columns.map((column) => (
              <TableCell
                key={`${reclamacao.id}-${column.uid}`}
                className="cursor-pointer"
                onClick={() =>
                  router.push(`/accounts/${reclamacao.id}`, reclamacao.id)
                }
              >
                <RenderCell reclamacao={reclamacao} columnKey={column.uid} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
