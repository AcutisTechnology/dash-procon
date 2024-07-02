import api from "@/config/api";
import { useQuery } from "@tanstack/react-query";

const fetchReclamacoes = async () => {
  const { data } = await api.get("/reclamacoes");
  return data;
};

export const useReclamacoes = () => {
  return useQuery({
    queryKey: ["reclamacoes"],
    queryFn: fetchReclamacoes,
  });
};
