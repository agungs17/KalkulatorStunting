import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [userToken = null, userDataRaw = null] = await Promise.all([
          AsyncStorage.getItem('access_token'),
          AsyncStorage.getItem('user_data'),
        ]);
        setToken(userToken);
        setUser(userDataRaw ? JSON?.parse?.(userDataRaw) || null : null);
      } catch (err) {
        __DEV__ && console.warn('Failed to load auth data:', err);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadAuthData();
  }, []);

  const loginContext = async (token, user) => {
    try {
      await Promise.all([
        AsyncStorage.setItem('access_token', token),
        AsyncStorage.setItem('user_data', JSON.stringify(user)),
      ]);
      setToken(token);
      setUser(user);
    } catch (err) {
      __DEV__ && console.log('loginContext error:', err);
    }
  };

  const logoutContext = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('access_token'),
        AsyncStorage.removeItem('user_data'),
      ]);
      setToken(null);
      setUser(null);
    } catch (err) {
      __DEV__ && console.log('logoutContext error:', err);
    }
  };

  const authValue = useMemo(() => ({ token, user, loginContext, logoutContext, loading }), [token, user, loading]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);