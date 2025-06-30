import React, { useState } from "react";
import Container from "../../atomic/atoms/Container";
import Text from "../../atomic/atoms/Text";
import Header from "../../atomic/molecules/Header";
import { Keyboard, View } from "react-native";
import { COLORS } from "../../utils/themes";
import TextInput from "../../atomic/atoms/TextInput";
import Button from "../../atomic/atoms/Button";
import { resetStateErrors, updateStateField } from "../../utils/script";
import { postLogin } from "../../services/apis/auth";
import { isEmpty } from 'lodash-es'

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [form, setForm] = useState({
    email : '',
    email_error : '',
    password : '',
    password_error : ''
  })

  const {email, email_error, password, password_error} = form || {}

  const handleLogin = async() => {
    Keyboard.dismiss()

    setForm(resetStateErrors(form))
    setLoading(true)
    setIsError(false)
    
    const res = await postLogin(form)

    if(!isEmpty(res?.error?.validator)) setForm((prev) => ({...prev, ...res?.error?.validator}))
    else if(!isEmpty(res?.error)) setIsError(true)
    
    setLoading(false)
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleForgotPasword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <Container useEarlyReturn useSafeArea>
      <Header useBack title="" noShadow />
      <Container style={{ paddingTop: 20 }} useKeyboardAvoidingView>
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
          <TextInput title="" value={email} error={email_error} isError={isError} onChangeText={(value) => updateStateField(setForm, 'email', value)} placeholder="Masukan Email" />
          <TextInput title="" value={password} error={password_error} isError={isError} onChangeText={(value) => updateStateField(setForm, 'password', value)} placeholder="Masukan Password" secureTextEntry />
          <Text
            containerStyle={{ alignItems: "flex-end" }}
            onPress={handleForgotPasword}
          >
            Lupa password?
          </Text>
          <Button
            loading={loading}
            containerStyle={{ width: "100%", marginTop: 15 }}
            onPress={handleLogin}
          >
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
