import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "../screens/Homepage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toastable from "react-native-toastable";
import { COLORS } from "../utils/themes";
import { moderateScale } from "../utils/script";

const Stack = createStackNavigator();

const NavigationRoot = () => {
  return (
    <Stack.Navigator initialRouteName="Homepage" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Homepage" component={Homepage} />
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
};

export default Navigations;
