import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { useDenuncias } from "../hooks/useDenuncias";
import { columnsDenuncias as columns } from "./data";

const RenderCell = ({ denuncias, columnKey }: any) => {
  let value = denuncias[columnKey];

  if (columnKey === "createdAt") {
    const date = parseISO(value);
    value = format(date, "dd/MM/yyyy");
  }

  return <span>{value}</span>;
};

export function TableWrapperDenuncias() {
  const { data: denuncias } = useDenuncias();

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
        {denuncias?.map((denuncias: any) => (
          <TableRow key={denuncias.id}>
            {columns.map((column) => (
              <TableCell key={`${denuncias.id}-${column.uid}`}>
                <RenderCell denuncias={denuncias} columnKey={column.uid} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
