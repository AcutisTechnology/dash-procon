import { useEffect, useState } from "react";

interface UserProps {
  email: string;
  name: string;
  id: number;
  phone: string;
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");

    if (storedUserData && storedToken) {
      setUserData(JSON.parse(storedUserData));
      setToken(JSON.parse(storedToken));
    }
  }, []);

  return { userData, token };
};

export default useUserData;
