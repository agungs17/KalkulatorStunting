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

// invite forgot password
export const postForgotPassword = async(body) => {
  const {email} = body || {}
  try {
    const res = await vercelInstance.post('/invite//send-email-forgot-password', {email});
    return formatResponse({ res, isToastSuccess: true });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};
