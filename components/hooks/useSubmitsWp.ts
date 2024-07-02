import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getToken = async () => {
  const { data } = await axios.post(
    "https://proconsr.pb.gov.br/wp-json/jwt-auth/v1/token",
    {
      username: "proconsr",
      password: "H%viq@auwU)FwT*l8^B^owu9",
    }
  );
  return data.data.token;
};

const fetchFormSubmissions = async (token: string) => {
  const { data } = await axios.get(
    "https://proconsr.pb.gov.br/wp-json/elementor/v1/form-submissions",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useFormSubmissions = () => {
  return useQuery({
    queryKey: ["formSubmissions"],
    queryFn: async () => {
      const token = await getToken();
      return fetchFormSubmissions(token);
    },
  });
};
