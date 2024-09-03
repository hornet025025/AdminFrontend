import axios from "axios";
import store from "../store/store";
import { BASE_URL } from "../constant";
export const axiosAuth = () => {
  const AuthAxios = axios.create({
    baseURL: BASE_URL ,
    headers: {
      token: store.getState().authReducer.token,
    },
  });
  return AuthAxios;
};