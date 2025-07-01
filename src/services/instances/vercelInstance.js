import axios from 'axios';
import configurations from '../../configurations';
import { Alert } from 'react-native';
import { getDeviceHeaders } from '../utils/scripts';
import { deleteLogout } from '../apis/auth';
import authStore from '../../zustand/authStore';

const vercelInstance = axios.create({
  baseURL: configurations.vercelBaseUrl,
  timeout: 10000,
});

vercelInstance.interceptors.request.use(
  async (config) => {
    const token = authStore.getState().token;
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
    const { token : oldToken, clear, setData } = authStore.getState();

    if (status === 401 && !originalRequest._retry) {
      try {
        if(errorStatus === "Token expired") {
          originalRequest._retry = true;
          const deviceHeaders = await getDeviceHeaders();

          const refreshResponse = await vercelInstance.post('/auth/refresh-token', { token : oldToken }, { headers: { ...deviceHeaders }});

          const newToken = refreshResponse.data?.data?.token;
          setData({ token : newToken });
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          return vercelInstance(originalRequest);
        } else {
          Alert.alert('Token', message)
          clear()
        }
      } catch (refreshErr) {
        Alert.alert('Token', message)
        clear()
      }
    }

    return Promise.reject(error);
  }
);

export default vercelInstance;
