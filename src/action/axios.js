import axios from "axios";
import { BASE_URL } from "../constant";
export const axiosAuth = () => {
  const AuthAxios = axios.create({
    baseURL: BASE_URL ,
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return AuthAxios;
};