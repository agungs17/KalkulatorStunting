import { resetStateErrors } from "../../utils/script";
import vercelInstance from "../instances/vercelInstance";
import { formatResponse } from "../utils/scripts";

export const postRegister = async(body) => {
  const { email, password, name, nik, role, children = [] } = body || {}
  const newChildren = resetStateErrors(children) || []
  try {
    const res = await vercelInstance.post('/auth/register', { email, password, name, nik, role, children : newChildren });
    return formatResponse({ res, isToastSuccess: true });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};

export const postCheckUnique = async(body) => {
  const { email, password, name, nik, role, children = [] } = body || {}
  const newChildren = resetStateErrors(children) || []
  try {
    const res = await vercelInstance.post('/auth/check-unique', { email, password, name, nik, role, children : newChildren });
    return formatResponse({ res });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};