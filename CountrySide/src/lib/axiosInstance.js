import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const useAxios = () => {
  const { user } = useAuthContext();

  const instance = axios.create({
    baseURL: "http://localhost:5000/auth",
    headers: {
      Authorization: user?.token ? `Bearer ${user.token}` : "",
    },
  });

  return instance;
};
