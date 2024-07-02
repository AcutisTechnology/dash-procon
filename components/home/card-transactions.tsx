import { Card, CardBody } from "@nextui-org/react";
import { useFormSubmissions } from "../hooks/useSubmitsWp";

export const CardTransactions = () => {
  const { data } = useFormSubmissions();

  return (
    <Card className=" bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Ultimas reclamações
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 ">
          {data.data
            ?.map((item: any) => (
              <div
                key={item.id}
                className="flex flex-row items-center justify-between w-full"
              >
                <span className="text-default-900 font-semibold">
                  {item.form.name}
                </span>
                <div>
                  <span className="text-success text-xs">
                    {item.main.value}
                  </span>
                </div>

                <span className="text-default-500 text-xs">
                  {new Date(item.created_at).toLocaleString("pt-BR", {
                    dateStyle: "short",
                  })}
                </span>
              </div>
            ))
            .slice(0, 5)}
        </div>
      </CardBody>
    </Card>
  );
};
