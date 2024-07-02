"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { TableWrapperDenuncias } from "../table/tableDenuncias";
import { AddUser } from "./add-user";

export const Denuncias = () => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Início</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span className="mr-3">Denuncias /</span>
        </li>
        <li className="flex gap-2">
          <span>Listagem</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Todas as denuncias</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Pesquisar"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser />
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapperDenuncias />
      </div>
    </div>
  );
};
