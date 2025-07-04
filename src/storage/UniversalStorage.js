let storageInstance;

const isDevelopment = __DEV__;
const isDebug = typeof global.nativeCallSyncHook === "undefined";

if (isDevelopment && isDebug) {
  const AsyncStorage = require("@react-native-async-storage/async-storage").default;

  storageInstance = {
    setItem: async (key, value) => {
      await AsyncStorage.setItem(key, value);
      await AsyncStorage.setItem(`${key}-temp`, value);
    },
    getItem: async (key) => {
      const tempValue = await AsyncStorage.getItem(`${key}-temp`);
      if (tempValue !== null) {
        return tempValue;
      }
      return await AsyncStorage.getItem(key);
    },
    removeItem: async (key) => {
      await AsyncStorage.removeItem(key);
      await AsyncStorage.removeItem(`${key}-temp`);
    },
  };
} else {
  const { MMKV } = require("react-native-mmkv");
  const id = "mmkv-storage";
  const encryptionKey = "KGUZxBamg9ou0kqJ78KpBQFb4XYKZOl5wxL8oMH5sbwmbZyHagAxxP9jCgjT1PwFMzBrsm32S6cu0YT0sv7W10ooxe60V5gDEDvAczKu3eTMBGRh0BSnyclQoz8JB7c1nE1G02mVbCL1NG0gySbXQD8ZA1LUz3sgCuMo3gaKtAcns4bESZIFIGjWzfYkimgMG5sK2wJACpjfQLUIMCI05SrXKEDpbpuVKlu1Qb28oBsczII66DNVSrMrdDZyqMQMCoi5UAtxof6UB6ZeevgnoGxIu1aHdglIcdzGoHbeNOoQZ0hQn788DOxfXdKDeE29";
  const mmkv = new MMKV({ id, encryptionKey });

  storageInstance = {
    setItem: async (key, value) => {
      mmkv.set(key, value);
      if (isDevelopment) {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default;
        await AsyncStorage.setItem(`${key}-temp`, value);
      }
    },
    getItem: async (key) => {
      if (isDevelopment) {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default;
        const tempValue = await AsyncStorage.getItem(`${key}-temp`);
        if (tempValue !== null) {
          return tempValue;
        }
      }
      return mmkv.getString(key) ?? null;
    },
    removeItem: async (key) => {
      mmkv.delete(key);
      if (isDevelopment) {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default;
        await AsyncStorage.removeItem(`${key}-temp`);
      }
    },
  };
}

const UniversalStorage = storageInstance;
export default UniversalStorage;