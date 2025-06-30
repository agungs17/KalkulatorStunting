import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Homepage from '../../screens/ProtectedScreens/Homepage';
import Profile from '../../screens/ProtectedScreens/Profile';
import ScanBarcode from '../../screens/ProtectedScreens/ScanBarcode';
import RiwayatBalita from '../../screens/ProtectedScreens/RiwayatBalita';

const Stack = createStackNavigator();

const ProtectedRoutes = () => {
  return (
    <Stack.Navigator initialRouteName='Homepage' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="RiwayatBalita" component={RiwayatBalita} />
      <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
    </Stack.Navigator>
  );
};

export default ProtectedRoutes;
