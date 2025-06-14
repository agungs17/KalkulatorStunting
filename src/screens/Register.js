import React from "react";
import Container from "../atomic/atoms/Container";
import TextInput from "../atomic/atoms/TextInput";
import Text from "../atomic/atoms/Text";
import { COLORS } from "../utils/themes";
import Header from "../atomic/molecules/Header";
import Button from "../atomic/atoms/Button";

const Register = ({navigation}) => {
  const handleLogin = () =>{
    navigation.navigate("Login");
  }
  return (
    <Container useEarlyReturn useSafeArea >
      <Header useBack title="" noShadow />
      <Container useKeyboardAvoidingView usePaddingHorizontal style={{ paddingTop:20 }}>
      <Text
        fontSize={28}
        fontWeight="bold"
        color={COLORS.GREEN}
        textStyle={{ textAlign: "center" }}
      >
        Buat akun
      </Text>
      <Text
        fontWeight="bold"
        fontSize={17}
        textStyle={{ textAlign: "center" }}
        containerStyle={{ paddingTop: 10 }}
      >
        Yuk daftar dulu untuk mulai pantau tumbuh kembang si kecil!
      </Text>
      <TextInput
      title=""
      placeholder="Masukan email"
      containerStyle={{ paddingTop:30 }}
      />
       <TextInput
      title=""
      placeholder="Masukan password"
      containerStyle={{ paddingTop:10 }}
      />
       <TextInput
      title=""
      placeholder="Masukan NIK"
      containerStyle={{ paddingTop:10 }}
      />
       <TextInput
      title=""
      placeholder="Masukan role"
      containerStyle={{ paddingTop:10 }}
      />
      <Button containerStyle={{ width: "100%", marginTop: 15 }}>Buat akun</Button>
      <Text textStyle={{ textAlign:"center" , paddingTop : 20 }} fontSize={15} fontWeight="bold" onPress={handleLogin}>Sudah punya akun</Text>
      </Container>
    </Container>
  );
};

export default Register;
