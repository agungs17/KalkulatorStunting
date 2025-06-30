import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStore } from './AuthStore';

const AuthContext = createContext();

const AuthProviderWithRef = ({ children }) => {
  const internalRef = useRef();

  return (
    <InnerAuthProvider ref={internalRef}>
      {children}
    </InnerAuthProvider>
  );
};

export const AuthProvider = AuthProviderWithRef;

const InnerAuthProvider = forwardRef(({ children }, ref) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    AuthStore.setRef(ref);
  },[])

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [userToken = null, userDataRaw = null] = await Promise.all([
          AsyncStorage.getItem('access_token'),
          AsyncStorage.getItem('user_data'),
        ]);
        setToken(userToken);
        setUser(userDataRaw ? JSON.parse(userDataRaw) : null);
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

  const setAuthContext = async ({ token, user }) => {
    try {
      const promises = [];

      if (token) {
        promises.push(AsyncStorage.setItem('access_token', token));
        setToken(token);
      }

      if (user) {
        promises.push(AsyncStorage.setItem('user_data', JSON.stringify(user)));
        setUser(user);
      }

      await Promise.all(promises);
    } catch (err) {
      __DEV__ && console.log('setAuthContext error:', err);
    }
  };

  const removeAuthContext = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('access_token'),
        AsyncStorage.removeItem('user_data'),
      ]);
      setToken(null);
      setUser(null);
    } catch (err) {
      __DEV__ && console.log('removeAuthContext error:', err);
    }
  };

  useImperativeHandle(ref, () => ({
    getContext: () => ({ token, user, loading }),
    setAuthContext,
    removeAuthContext,
  }));

  const authValue = useMemo(() => ({ token, user, setAuthContext, removeAuthContext, loading }), [token, user, loading]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
});

export const useAuth = () => useContext(AuthContext);
