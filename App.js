import React from "react";
import Navigations from "./src/navigations";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
      <SafeAreaProvider>
        <Navigations />
      </SafeAreaProvider>
  );
};

export default App;
