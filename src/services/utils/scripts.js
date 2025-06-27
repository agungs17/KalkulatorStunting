import { showToastable } from "react-native-toastable";
import DeviceInfo from 'react-native-device-info';
import configurations from "../../configurations";

export const getDeviceHeaders = async () => {
  try {
    const [deviceId, deviceName, appVersion] = await Promise.all([
      DeviceInfo.getUniqueId(),
      DeviceInfo.getDeviceName(),
      DeviceInfo.getVersion()
    ]);

    return {
      'x-device-id': deviceId || 'NOT SET',
      'x-device-name': deviceName || 'NOT SET',
      'x-app-version': appVersion || 'NOT SET',
    };
  } catch (err) {
    return {
      'x-device-id': 'NOT SET',
      'x-device-name': 'NOT SET',
      'x-app-version': 'NOT SET',
    };
  }
};

export const formatResponse = ({
  res,
  isToastError = false,
  isToastSuccess = false,
  isToastEmpty = false,
}) => {
  const response = res?.data ?? {};
  const status = response?.code ?? 500;
  const message = response?.message ?? 'Ups.. Ada yang salah. Coba lagi nanti!';
  const data = response?.data ?? null;
  const error = response?.error ?? null;
  const path = response?.path ?? 'UnknownPath';

  // Logging
  if(configurations.logging) console.log(`[${path}]`, { status, message, data, error });

  // Toast feedback
  if (status === 200 && isToastSuccess) {
    showToastable({
      message: `🎉 ${message}`,
      status: 'success',
    });
  } else if (status === 404 && isToastEmpty) {
    showToastable({
      message: `🥺 ${message}`,
      status: 'warning',
    });
  } else if (status !== 200 && isToastError) {
    showToastable({
      message: `⚠️ ${message}`,
      status: 'danger',
    });
  }

  return {
    status,
    message,
    data,
    error,
  };
};
