import { Alert } from "react-native";

export const formatResponse = ({
  identifer,
  res,
  isAlertError = false,
  isAlertEmpty = false,
  isAlertSuccess = false,
}) => {
  let message;
  let status;
  let data = [];

  if (!res) {
    status = 500; // Internal Server Error
    message = `${identifer} Terjadi kesalahan saat mengambil data.`;
    if (isAlertError) {
      Alert.alert(String(status), message);
    }
  } else if (res.empty) {
    status = 404; // Not Found
    message = `${identifer} Data tidak ditemukan.`;
    if (isAlertEmpty) {
      Alert.alert(String(status), message);
    }
  } else {
    status = 200; // Sukses
    message = `${identifer} Data berhasil.`;
    data = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (isAlertSuccess) {
      Alert.alert(String(status), message);
    }
  }

  return {
    status,
    message,
    data,
  };
};