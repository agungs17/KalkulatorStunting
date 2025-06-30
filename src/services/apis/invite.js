import vercelInstance from "../instances/vercelInstance";
import { formatResponse } from "../utils/scripts";

export const getEmailVerification = async() => {
  try {
    const res = await vercelInstance.get('/invite/resend-email-verfication');
    return formatResponse({ res, isToastSuccess: true });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};