import vercelInstance from "../instances/vercelInstance";
import { formatResponse } from "../utils/scripts";

export const postRegister = async({ email, password, name, nik, role, children = [] }) => {
  try {
    const res = await vercelInstance.post('/auth/register', { email, password, name, nik, role, children });
    return formatResponse({ res, isToastSuccess: true });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};

export const postCheckUnique = async({ email, password, name, nik, role, children = [] }) => {
  try {
    const res = await vercelInstance.post('/auth/check-unique', { email, password, name, nik, role, children });
    return formatResponse({ res });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};