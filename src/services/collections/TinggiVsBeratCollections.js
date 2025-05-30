import { formatResponse, fsdb, TYPE_COLLECTIONS } from "..";
import { getRoundDownHeight, getTypeChild } from "../../utils/script";


export const getDataTinggiVsBerat = async (gender, ageGroup, height) => {
  const res = await fsdb()
    .collection(TYPE_COLLECTIONS.TINGGIVSBERAT_COLLECTIONS)
    .where('jenis_kelamin', '==', gender.toUpperCase())
    .where('kelompok_usia', '==', getTypeChild(ageGroup))
    .where('tinggi', '==', getRoundDownHeight(height))
    .get();
    
    return formatResponse({
      identifer : 'getDataTinggiVsBerat',
      res,
      isToastEmpty : true
    })
};
