// route disini tidak harus login

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardingAuth from '../../screens/PublicScreens/OnBoardingAuth';
import Login from '../../screens/PublicScreens/Login';
import Register from '../../screens/PublicScreens/Register';
import FinalRegister from '../../screens/PublicScreens/FinalRegister';
import ForgotPassword from '../../screens/PublicScreens/ForgotPassword';

const Stack = createStackNavigator();

const PublicRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='OnBoardingAuth' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoardingAuth" component={OnBoardingAuth} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="FinalRegister" component={FinalRegister} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
