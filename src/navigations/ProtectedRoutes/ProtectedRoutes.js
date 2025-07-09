// route disini harus login

import React, { useEffect, useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import EmailVerfication from '../../screens/ProtectedScreens/EmailVerification';
import authStore from '../../zustand/authStore';
import { getProfile } from '../../services/apis/user';
import BottomTab from './BottomTab';
import ForgotPassword from '../../screens/PublicScreens/ForgotPassword';
import Informasi from '../../screens/ProtectedScreens/Informasi';
import TeamPosyandu from '../../screens/ProtectedScreens/TeamPosyandu';
import Resep from '../../screens/ProtectedScreens/Resep';
import Perkembangan from '../../screens/ProtectedScreens/Perkembangan';
import FormTambahTeam from '../../screens/ProtectedScreens/FormTambahTeam';
import FormTambahAnak from '../../screens/ProtectedScreens/FormTambahAnak';



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
    <Stack.Navigator initialRouteName='BottomTab' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTab} />
       <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
       <Stack.Screen name="Informasi" component={Informasi} />
       <Stack.Screen name="TeamPosyandu" component={TeamPosyandu} />
       <Stack.Screen name="Resep" component={Resep} />
       <Stack.Screen name="Perkembangan" component={Perkembangan} />
      <Stack.Screen name="EmailVerification" component={EmailVerfication} />
      <Stack.Screen name="FormTambahTeam" component={FormTambahTeam} />
      <Stack.Screen name="FormTambahAnak" component={FormTambahAnak} />
    </Stack.Navigator>
  );
};

export default ProtectedRoutes;
