import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getToken = async () => {
  const { data } = await axios.post(
    "https://proconsr.pb.gov.br/wp-json/jwt-auth/v1/token",
    {
      username: "acutis",
      password: "(682v&uBQs$cl^5iiGM!Fu0$",
    }
  );
  return data.token;
};

export const useToken = () => {
  return useQuery({
    queryKey: ["token"],
    queryFn: getToken,
    staleTime: 1000 * 60 * 60,
  });
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

const fetchFormSubmissionsId = async (id: number, token: string) => {
  const { data } = await axios.get(
    `https://proconsr.pb.gov.br/wp-json/elementor/v1/form-submissions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const useFormSubmissionsId = (id: number) => {
  const {
    data: tokenData,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useToken();

  return useQuery({
    queryKey: ["formSubmissions", id],
    queryFn: () => fetchFormSubmissionsId(id, tokenData),
    enabled: !!tokenData, // This ensures the query only runs when token is available
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
