import React from "react";
import Container from "../../atomic/atoms/Container";
import Image from "../../atomic/atoms/Image";
import Header from "../../atomic/molecules/Header";
import Text from "../../atomic/atoms/Text";
import { COLORS } from "../../utils/themes";
import TextInput from "../../atomic/atoms/TextInput";
import Button from "../../atomic/atoms/Button";

const ForgotPassword = () => {
  return (
    <Container useEarlyReturn useSafeArea>
      <Header useBack title="" noShadow />
      <Container usePaddingHorizontal useKeyboardAvoidingView>
        <Text
          fontSize={25}
          fontWeight="bold"
          color={COLORS.GREEN}
          textStyle={{ textAlign: "center" }}
        >
          Lupa Password
        </Text>
        <Image
          width={280}
          height={280}
          resizeMode="contain"
          containerStyle={{ alignSelf: "center" }}
          source={require("../../assets/image/jendela.png")}
        />
        <Text
          fontSize={17}
          fontWeight="bold"
          containerStyle={{ alignSelf: "center" }}
          textStyle={{ textAlign: "center" }}
        >
          Kami siap bantu! Isi email kamu, lalu cek kotak masuk untuk reset password.
        </Text>
        <TextInput title="" placeholder="Masukan email" containerStyle={{ paddingTop: 32 }} />
        <Button containerStyle={{ width:"100%" ,marginTop:15 }}>Kirim</Button>
      </Container>
    </Container>
  );
};

export default ForgotPassword;
