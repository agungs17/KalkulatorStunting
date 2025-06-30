import React, { useState, useEffect, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  BackHandler,
  AppState
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import Container from "../../atomic/atoms/Container";
import Text from "../../atomic/atoms/Text";
import Icon from "../../atomic/atoms/Icon";
import { COLORS } from "../../utils/themes";
import { getEmailVerification } from "../../services/apis/invite";
import { getProfile } from "../../services/apis/user";
import { horizontalScale } from "../../utils/script";
import Button from "../../atomic/atoms/Button";
import { deleteLogout } from "../../services/apis/auth";

const COOLDOWN_SECONDS = 300;
const STORAGE_KEY = "cooldown_expire_at";

const EmailVerification = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const checkCooldown = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const expireTime = parseInt(saved, 10);
          const now = Date.now();
          const diff = Math.floor((expireTime - now) / 1000);
          if (diff > 0) {
            setCooldown(diff);
          } else {
            await AsyncStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (err) {
        __DEV__ && console.log("Gagal membaca cooldown dari storage", err);
      }
    };
    checkCooldown();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          AsyncStorage.removeItem(STORAGE_KEY);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;

    setLoading(true);
    try {
      await getEmailVerification();
      const expireAt = Date.now() + COOLDOWN_SECONDS * 1000;
      await AsyncStorage.setItem(STORAGE_KEY, expireAt.toString());
      setCooldown(COOLDOWN_SECONDS);
    } catch (err) {
      console.error("Gagal kirim ulang email verifikasi:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => true;
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    const syncProfile = async() => {
        const res = await getProfile();
        const { user } = res.data || {}
        if (user.email_verification) navigation.reset({index: 0, routes: [{ name: 'Homepage' }]});
    }

    const onAppStateChange = async (state) => {
      if (state === "active") syncProfile()
    };

    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Container
      useSafeArea
      useEarlyReturn
    >
      <Container
        usePaddingHorizontal
        style={{ alignItems: "center", paddingHorizontal: 25 }}
        center
      >
        <Text
          fontSize={22}
          fontWeight="bold"
          color={COLORS.GREEN}
          textStyle={{ textAlign: "center" }}
        >
          Verifikasi Email Dulu Yuk!
        </Text>

        <Text
          fontSize={15}
          color="gray"
          textStyle={{ textAlign: "center" }}
          containerStyle={{ paddingTop: 8, paddingBottom: 22 }}
        >
          Silahkan verifikasi email terlebih dahulu. Jika email tidak terlihat pada inbox, coba cek folder spam. Belum dapat? Kirim ulang email verifikasi!
        </Text>
        <TouchableOpacity onPress={handleResend} disabled={cooldown > 0 || loading}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="restore"
              color={cooldown > 0 ? "gray" : COLORS.BLUE}
              size={18}
              containerStyle={{ paddingRight: 4 }}
            />
            <Text
              color={cooldown > 0 ? "gray" : COLORS.BLUE}
              fontWeight="bold"
              fontSize={15}
            >
              {cooldown > 0 ? `Kirim ulang dalam ${formatTime(cooldown)}` : loading ? "Mengirim..." : "Kirim Ulang"}
            </Text>
          </View>
        </TouchableOpacity>
      </Container>
      <View
        style={{
          paddingHorizontal: horizontalScale(20),
          paddingVertical: 15,
          borderTopWidth: 0.5,
          borderColor: "gray",
        }}
      >
        <Button containerStyle={{ width: "100%" }} onPress={async() => await deleteLogout()} loading={loading}>Keluar</Button>
      </View>
    </Container>
  );
};

export default EmailVerification;
