import { GET_ROCKETS } from "../../components/API/ConstAPI";
import { apiInstance } from "./axiosApi";

export const getAllrockets = () => {
  return apiInstance.get(GET_ROCKETS);
};
