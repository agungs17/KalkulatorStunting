import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toastable from 'react-native-toastable';
import { ActivityIndicator, View } from 'react-native';

import PublicRoutes from './PublicRoutes/PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import { COLORS } from '../utils/themes';
import { moderateScale } from '../utils/script';
import linking from './linking';
import authStore from '../zustand/authStore';

const NavigationRoot = () => {
  const token = authStore(state => state.token);
  
  return token ? <ProtectedRoutes /> : <PublicRoutes />;
};

const Navigations = () => {
  const token = authStore(state => state.token);
  const hasHydrated = authStore(state => state.hasHydrated);

  const { top } = useSafeAreaInsets();

  const LoadingComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={COLORS.GREEN} />
    </View>
  );

  if (!hasHydrated) return <LoadingComponent />;

  return (
    <NavigationContainer linking={token ? linking : undefined}>
      <NavigationRoot />
      <Toastable statusMap={{ success: COLORS.GREEN, danger: COLORS.RED, warning: COLORS.ORANGE, info: COLORS.BLUE }} offset={top + moderateScale(25)} position="top" animationInTiming={0} animationOutTiming={0} duration={3500} />
    </NavigationContainer>
  );
};

export default Navigations;
