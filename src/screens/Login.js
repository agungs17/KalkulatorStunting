import React from "react";
import Container from "../atomic/atoms/Container";
import Text from "../atomic/atoms/Text";
import Header from "../atomic/molecules/Header";
import { View } from "react-native";
import { COLORS } from "../utils/themes";
import TextInput from "../atomic/atoms/TextInput";
import Button from "../atomic/atoms/Button";

const Login = ({navigation}) => {

const handleRegister = () => {
    navigation.navigate("Register")
}
const handleForgotPasword =()=>{
    navigation.navigate("ForgotPassword")
}
  return (
    <Container useEarlyReturn useSafeArea>
      <Header useBack title="" noShadow />
      <Container style={{ paddingTop : 20 }} useKeyboardAvoidingView>
        <View style={{ paddingHorizontal: 40, alignSelf: "center" }}>
          <Text
            fontSize={28}
            fontWeight="bold"
            color={COLORS.GREEN}
            textStyle={{ textAlign: "center" }}
          >
            Login disini
          </Text>
          <Text
            fontWeight="bold"
            fontSize={17}
            textStyle={{ textAlign: "center" }}
            containerStyle={{ paddingTop: 25 }}
          >
            Wah, kamu kembali! Yuk lanjutkan perjalanan si kecil.
          </Text>
        </View>
        <Container usePaddingHorizontal style={{ paddingTop: 80 }}>
          <TextInput title="" placeholder="Masukan Email" />
          <TextInput title="" placeholder="Masukan Password" secureTextEntry />
          <Text containerStyle={{ alignItems: "flex-end" }} onPress={handleForgotPasword}>
            Lupa password?
          </Text>
          <Button containerStyle={{ width: "100%", marginTop: 15 }}>
            Masuk
          </Button>
          <Text
            fontWeight="bold"
            fontSize={16}
            containerStyle={{ paddingTop: 18, alignSelf: "center" }}
            onPress={handleRegister}
          >
            Buat akun baru
          </Text>
        </Container>
      </Container>
    </Container>
  );
};

export default Login;
