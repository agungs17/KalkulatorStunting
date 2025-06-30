import { AuthStore } from "../../context/AuthStore";
import vercelInstance from "../instances/vercelInstance";
import { formatResponse } from "../utils/scripts";

export const getProfile = async() => {
  try {
    const res = await vercelInstance.get('/user/profile');
    const formatRes = formatResponse({ res });
    AuthStore.set({ user : formatRes.data.user })
    return formatRes
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};