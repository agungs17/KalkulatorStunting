import React from "react";
import Navigations from "./src/navigations";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Navigations />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;
