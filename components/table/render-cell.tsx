import React from "react";

interface Props {
  reclamacoes: any;
  columnKey: string | React.Key;
}

export const RenderCell = ({ reclamacoes, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = reclamacoes[columnKey];
  switch (columnKey) {
    case "name":
      return <span>{reclamacoes.form.name}</span>;
    default:
      return cellValue;
  }
};
