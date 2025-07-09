import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "../../screens/ProtectedScreens/Homepage";
import Profile from "../../screens/ProtectedScreens/Profile";
import RiwayatBalita from "../../screens/ProtectedScreens/RiwayatBalita";
import ScanBarcode from "../../screens/ProtectedScreens/ScanBarcode";
import Artikel from "../../screens/ProtectedScreens/Artikel";
import Icon from "@react-native-vector-icons/material-design-icons";
import { COLORS } from "../../utils/themes";

const BottomTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.GREEN, 
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          position: "absolute",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarLabelStyle: {
          fontSize: 13,
        },
      }}
    >

      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Riwayat"
        component={RiwayatBalita}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={ScanBarcode}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="qrcode-scan" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Artikel"
        component={Artikel}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookshelf" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomTab;
