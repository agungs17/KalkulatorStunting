import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import configurations from '../../configurations';
import { Alert } from 'react-native';
import { getDeviceHeaders } from '../utils/scripts';
import { deleteLogout } from '../apis/auth';

const vercelInstance = axios.create({
  baseURL: configurations.vercelBaseUrl,
  timeout: 10000,
});

vercelInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    const deviceHeaders = await getDeviceHeaders();

    config.headers = {
      ...(config.headers || {}),
      ...deviceHeaders,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token status
vercelInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error?.config;
    const status = error?.response?.status;
    const errorStatus = error?.response?.data?.error;
    const message = error?.response?.data?.message;

    if (status === 401 && !originalRequest._retry) {
      try {
        if(errorStatus === "Token expired") {
          originalRequest._retry = true;
          const deviceHeaders = await getDeviceHeaders();
          const oldToken = await AsyncStorage.getItem('access_token');
          const refreshResponse = await vercelInstance.post('/refresh-token', {token : oldToken}, { headers: { ...deviceHeaders } });

          const newToken = refreshResponse.data?.data?.token;
          await AsyncStorage.setItem('access_token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          return vercelInstance(originalRequest);
        } else {
          Alert.alert('Token', message)
          await deleteLogout()
        }
      } catch (refreshErr) {
        Alert.alert('Token', message)
        await deleteLogout()
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default vercelInstance;
