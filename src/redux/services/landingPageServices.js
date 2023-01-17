import { GET_SHIPS } from "../../components/API/ConstAPI";
import { apiInstance } from "./axiosApi";

export const getAllShips = (param) => {
  return apiInstance.get(GET_SHIPS, {}, { params: param });
};
