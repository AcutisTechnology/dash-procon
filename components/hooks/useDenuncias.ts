import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";

const fetchDenuncias = async () => {
  const { data } = await api.get("/denuncias");
  return data;
};

export const useDenuncias = () => {
  return useQuery({
    queryKey: ["denuncias"],
    queryFn: fetchDenuncias,
  });
};
