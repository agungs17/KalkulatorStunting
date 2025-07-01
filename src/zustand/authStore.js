import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      hasHydrated: false,
      // TODO
      setData: ({ token, user, hasHydrated }) => {
         set((state) => ({
          ...state,
          token: token ?? state.token,
          user: user ?? state.user,
          hasHydrated: hasHydrated ?? state.hasHydrated
        }))
      },
      clear: () => set((state) => ({ ...state, token: null, user: null }))
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => state?.setData?.({ hasHydrated: true })
    }
  )
);

export default authStore;
