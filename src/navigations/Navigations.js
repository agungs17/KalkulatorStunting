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
import Homepage from "../screens/Homepage";
import Profile from "../screens/Profile";
import ScanBarcode from "../screens/ScanBarcode";
import RiwayatBalita from "../screens/RiwayatBalita";
import FinalRegister from "../screens/FinalRegister";

const Stack = createStackNavigator()

const NavigationRoot = () => {
  return (
    <Stack.Navigator initialRouteName="LineChart" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingAuth" component={OnBoardingAuth} />
        <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
         <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="RiwayatBalita" component={RiwayatBalita} />
         <Stack.Screen name="Homepage" component={Homepage}/>
        <Stack.Screen name="ScanBarcode" component={ScanBarcode}/>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="FinalRegister" component={FinalRegister} />
      </Stack.Navigator>
  )
}

const Navigations = () => {
  const { top } = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <NavigationRoot/>
      <Toastable statusMap={{ success: COLORS.GREEN, danger: COLORS.RED, warning: COLORS.ORANGE, info: COLORS.BLUE }} offset={top + moderateScale(25)} position={'bottom'} animationInTiming={0} animationOutTiming={0} duration={3500} />
    </NavigationContainer>
);
}

export default Navigations
