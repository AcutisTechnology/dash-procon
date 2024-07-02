import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { useReclamacoes } from "../hooks/useReclamacoes";
import { columns } from "./data";

const RenderCell = ({ reclamacao, columnKey }: any) => {
  let value = reclamacao[columnKey];

  if (columnKey === "createdAt") {
    const date = parseISO(value);
    value = format(date, "dd/MM/yyyy");
  }

  return <span>{value}</span>;
};

export function TableWrapper() {
  const { data: reclamacoes, isLoading, error } = useReclamacoes();

  return (
    <Table aria-label="Tabela de Reclamações">
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
        {reclamacoes?.map((reclamacao: any) => (
          <TableRow key={reclamacao.id}>
            {columns.map((column) => (
              <TableCell key={`${reclamacao.id}-${column.uid}`}>
                <RenderCell reclamacao={reclamacao} columnKey={column.uid} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
