import { showToastable } from "react-native-toastable";

export const formatResponse = ({
  identifer,
  res,
  isToastError = false,
  isToastEmpty = false,
  isToastSuccess = false,
}) => {
  let message;
  let status;
  let data = [];

  if (!res) {
    status = 500; // Internal Server Error
    message = `${identifer} Terjadi kesalahan saat mengambil data.`;
    isToastError && showToastable({ message : `❌ ${message}`, status: 'danger' })
  } else if (res.empty) {
    status = 404; // Not Found
    message = `${identifer} Data tidak ditemukan.`;
    isToastEmpty && showToastable({ message : `🥺 ${message}`, status: 'warning' })
  } else {
    status = 200; // Sukses
    message = `${identifer} Data berhasil.`;
    data = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    isToastSuccess && showToastable({ message : `🔥 ${message}`, status: 'success' })
  }

  return {
    status,
    message,
    data,
  };
};