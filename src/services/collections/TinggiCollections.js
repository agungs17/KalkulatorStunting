import { formatResponse, fsdb, TYPE_COLLECTIONS } from "..";


export const getDataTinggi = async (gender, age) => {
  const res = await fsdb()
    .collection(TYPE_COLLECTIONS.TINGGI_COLLECTIONS)
    .where('jenis_kelamin', '==', gender.toUpperCase())
    .where('usia_bulan', '==', Number(age))
    .get();
    
    return formatResponse({
      identifer : 'getDataTinggi',
      res,
      isToastEmpty : true
    })
};
