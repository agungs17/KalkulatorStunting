// route disini harus login

import React, { useEffect, useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Homepage from '../../screens/ProtectedScreens/Homepage';
import Profile from '../../screens/ProtectedScreens/Profile';
import ScanBarcode from '../../screens/ProtectedScreens/ScanBarcode';
import RiwayatBalita from '../../screens/ProtectedScreens/RiwayatBalita';
import { useNavigation } from '@react-navigation/native';
import EmailVerfication from '../../screens/ProtectedScreens/EmailVerification';
import authStore from '../../zustand/authStore';
import { getProfile } from '../../services/apis/user';

const Stack = createStackNavigator();

const ProtectedRoutes = () => {
  const navigation = useNavigation()
  const token = authStore(state => state.token);
  const emailVerification = authStore(state => state.user.email_verification);

  useLayoutEffect(() => {
    const syncProfile = async() => {
      await getProfile()
    }

    if(token) syncProfile()
  }, [token]) 

  useEffect(() => {
    if(!emailVerification) navigation.navigate('EmailVerification')
  }, [emailVerification])

  return (
    <Stack.Navigator initialRouteName='Homepage' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="EmailVerification" component={EmailVerfication} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="RiwayatBalita" component={RiwayatBalita} />
      <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
    </Stack.Navigator>
  );
};

export default ProtectedRoutes;
