import React, { useState } from "react";
import Container from "../../atomic/atoms/Container";
import Image from "../../atomic/atoms/Image";
import Text from "../../atomic/atoms/Text";
import { COLORS } from "../../utils/themes";
import { View } from "react-native";
import Button from "../../atomic/atoms/Button";

const OnBoardingAuth = ({ navigation }) => {
  const handlePressLogin = () => {
    navigation.navigate("Login");
  }
    const handlePressRegister = () => {
    navigation.navigate("Register");
  }
  return (
    <Container
      useEarlyReturn
      useSafeArea
      style={{ paddingTop: "20%" }}
      usePaddingHorizontal
    >
      <Image
        width={300}
        height={300}
        resizeMode="contain"
        containerStyle={{ alignSelf: "center" }}
        source={require("../../assets/image/Momwithchild.png")}
      />
      <Text
        fontWeight="bold"
        fontSize={25}
        containerStyle={{ paddingTop: 20 }}
        textStyle={{
          textAlign: "center",
          color: COLORS.GREEN
        }}
      >
        Pantau Perkembangan Anak Lebih Mudah dan Akurat
      </Text>
      <Text
        fontSize={16}
        containerStyle={{
          paddingTop: 20,
          paddingBottom: 150
        }}
        textStyle={{ textAlign: "center" }}
      >
        Masuk atau daftar sekarang untuk mulai memantau tumbuh kembang si kecil.
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button containerStyle={{ width: "50%" }} onPress={handlePressLogin}>Login</Button>
        <Text
          fontWeight="bold"
          containerStyle={{ width: "50%", alignSelf: "center" }}
          textStyle={{ textAlign: "center" }}
          fontSize={18}
          onPress={handlePressRegister}
        >
          Register
        </Text>
      </View>
    </Container>
  );
};

export default OnBoardingAuth;
