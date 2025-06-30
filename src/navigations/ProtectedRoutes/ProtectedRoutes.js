// route disini harus login

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Homepage from '../../screens/ProtectedScreens/Homepage';
import Profile from '../../screens/ProtectedScreens/Profile';
import ScanBarcode from '../../screens/ProtectedScreens/ScanBarcode';
import RiwayatBalita from '../../screens/ProtectedScreens/RiwayatBalita';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import EmailVerfication from '../../screens/ProtectedScreens/EmailVerification';

const Stack = createStackNavigator();

const ProtectedRoutes = () => {
  const navigation = useNavigation()
  const { user } = useAuth()
  const { email_verification } = user

  useEffect(() => {
    if(!email_verification) navigation.navigate('EmailVerification')
  }, [user])

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
