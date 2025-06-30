import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toastable from 'react-native-toastable';
import { ActivityIndicator, View } from 'react-native';

import PublicRoutes from './PublicRoutes/PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import { COLORS } from '../utils/themes';
import { moderateScale } from '../utils/script';
import { useAuth } from '../context/AuthContext';
import linking from './linking';

const NavigationRoot = () => {
  const { token, user } = useAuth() || {};
  return token && user ? <ProtectedRoutes /> : <PublicRoutes />;
};

const Navigations = () => {
  const { token, loading } = useAuth();
  const { top } = useSafeAreaInsets();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.GREEN} />
      </View>
    );
  }

  return (
    <NavigationContainer
      linking={token ? linking : undefined}
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.GREEN} />
        </View>
      }
    >
      <NavigationRoot />
      <Toastable statusMap={{ success: COLORS.GREEN, danger: COLORS.RED, warning: COLORS.ORANGE, info: COLORS.BLUE, }} offset={top + moderateScale(25)} position="top" animationInTiming={0} animationOutTiming={0} duration={3500} />
    </NavigationContainer>
  );
};

export default Navigations;
