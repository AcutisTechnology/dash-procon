"use client";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { Divider, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormSubmissionsId } from "../hooks/useSubmitsWp";
import FormDisplay from "./form-display";

interface ViewAccountProps {
  data: {
    params: {
      id_account: number;
    };
  };
}

export const ViewAccount = ({ data }: ViewAccountProps) => {
  const {
    data: account,
    isLoading,
    isError,
    error,
  } = useFormSubmissionsId(data.params.id_account);
  const router = useRouter();

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
          <span
            className="cursor-pointer"
            onClick={() => router.push("/accounts")}
          >
            Reclamações
          </span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">Reclamação</h3>

      <Divider />

      <h3 className="text-xl font-semibold">Dados pessoais</h3>

      {isLoading ? (
        <Spinner />
      ) : (
        <FormDisplay
          fields={account?.data?.form?.fields}
          values={account?.data?.values}
        />
      )}
    </div>
  );
};
