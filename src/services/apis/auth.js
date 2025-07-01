import { resetStateErrors } from "../../utils/script";
import vercelInstance from "../instances/vercelInstance";
import { formatResponse, normalizeChildrenDates } from "../utils/scripts";
import authStore from "../../zustand/authStore";

export const postRegister = async(body) => {
  const { email, password, name, nik, role, children = [] } = body || {}
  const newChildren = normalizeChildrenDates(resetStateErrors(children));
  try {
    const res = await vercelInstance.post('/auth/register', { email, password, name, nik, role, children : newChildren });
    return formatResponse({ res, isToastSuccess: true });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};

export const postCheckUnique = async(body) => {
  const { email, password, name, nik, role, children = [] } = body || {}
  const newChildren = normalizeChildrenDates(resetStateErrors(children));
  try {
    const res = await vercelInstance.post('/auth/check-unique', { email, password, name, nik, role, children : newChildren });
    return formatResponse({ res });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};

export const postLogin = async(body) => {
  const {email, password} = body || {}
  try {
    const res = await vercelInstance.post('/auth/login', {email, password});
    const formatRes = formatResponse({ res, isToastSuccess: true });

    const setData = authStore.getState().setData;
    setData({token : formatRes?.data?.token, user : formatRes.data?.user})

    return formatRes
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
}

export const deleteLogout = async() => {
  const clear = authStore.getState().clear;

  try {
    const res = await vercelInstance.delete('/auth/logout');
    const formatRes = formatResponse({ res });

    clear()

    return formatRes
  } catch (error) {
    clear()

    return formatResponse({ res: error?.response });
  }
}