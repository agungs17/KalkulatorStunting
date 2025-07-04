/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { LogBox } from "react-native";

if (__DEV__) {
  LogBox.ignoreLogs([
    "Calling synchronous methods on native modules is not supported in Chrome",
  ]);
}

AppRegistry.registerComponent(appName, () => App);