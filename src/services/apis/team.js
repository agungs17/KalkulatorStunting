import vercelInstance from "../instances/vercelInstance";
import { formatResponse } from "../utils/scripts";

export const postCreateTeam = async(team_name) => {
  try {
    const res = await vercelInstance.post('/team/create',{team_name});
    return formatResponse({ res, isToastSuccess: true });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};

export const postAddTeam = async(email) => {
  try {
    const res = await vercelInstance.post('/team/add-member',{email});
    return formatResponse({ res, isToastSuccess: true });
  } catch (error) {
    return formatResponse({ res: error?.response, isToastError: true });
  }
};