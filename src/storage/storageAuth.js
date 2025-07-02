import { MMKV } from 'react-native-mmkv';

export const nameStorageAuth = "storage-auth"
const encryptionKey = "KGUZxBamg9ou0kqJ78KpBQFb4XYKZOl5wxL8oMH5sbwmbZyHagAxxP9jCgjT1PwFMzBrsm32S6cu0YT0sv7W10ooxe60V5gDEDvAczKu3eTMBGRh0BSnyclQoz8JB7c1nE1G02mVbCL1NG0gySbXQD8ZA1LUz3sgCuMo3gaKtAcns4bESZIFIGjWzfYkimgMG5sK2wJACpjfQLUIMCI05SrXKEDpbpuVKlu1Qb28oBsczII66DNVSrMrdDZyqMQMCoi5UAtxof6UB6ZeevgnoGxIu1aHdglIcdzGoHbeNOoQZ0hQn788DOxfXdKDeE29"

export const storageAuth = new MMKV({ 
    id: nameStorageAuth,
    encryptionKey,
});

export const zustandStorageAuth = {
  setItem: (key, value) => {
    storageAuth.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storageAuth.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: (key) => {
    storageAuth.delete(key);
    return Promise.resolve();
  },
};
