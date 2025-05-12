import { formatResponse, fsdb, TYPE_COLLECTIONS } from "..";


export const getDataBerat = async (gender, age) => {
  const res = await fsdb()
    .collection(TYPE_COLLECTIONS.BERAT_COLLECTIONS)
    .where('jenis_kelamin', '==', gender.toUpperCase())
    .where('usia_bulan', '==', Number(age))
    .get();
    
    return formatResponse({
      identifer : 'getDataBerat',
      res,
      isToastEmpty : true
    })
};
