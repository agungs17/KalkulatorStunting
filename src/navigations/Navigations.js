import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toastable from "react-native-toastable";
import { COLORS } from "../utils/themes";
import { moderateScale } from "../utils/script";
import Register from "../screens/Register";
import OnBoardingAuth from "../screens/OnBoardingAuth";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";

const Stack = createStackNavigator()

const NavigationRoot = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoardingAuth" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="OnBoardingAuth" component={OnBoardingAuth} />
        <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
  )
}

const Navigations = () => {
  const { top } = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <NavigationRoot/>
      <Toastable statusMap={{ success: COLORS.GREEN, danger: COLORS.RED, warning: COLORS.ORANGE, info: COLORS.BLUE }} offset={top + moderateScale(25)} position={'bottom'} />
    </NavigationContainer>
);
}

export default Navigations
