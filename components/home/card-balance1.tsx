import { Card, CardBody } from "@nextui-org/react";
import { useFormSubmissions } from "../hooks/useSubmitsWp";
import { Community } from "../icons/community";

export const CardBalance1 = () => {
  const { data } = useFormSubmissions();

  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Reclamações</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">
            {data?.data?.length} reclamações
          </span>
        </div>
      </CardBody>
    </Card>
  );
};
