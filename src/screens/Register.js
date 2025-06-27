import React, { useState } from "react";
import Container from "../atomic/atoms/Container";
import TextInput from "../atomic/atoms/TextInput";
import Text from "../atomic/atoms/Text";
import { COLORS } from "../utils/themes";
import Header from "../atomic/molecules/Header";
import Button from "../atomic/atoms/Button";
import { resetStateErrors, updateStateField } from "../utils/script";
import { postCheckUnique } from "../services/apis/auth";
import { isEmpty } from 'lodash-es'

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email : '',
    email_error : '',
    password : '',
    password_error : '',
    name : '',
    name_error : '',
    nik : '',
    nik_error : '',
    role : '',
    role_error : ''
  })

  const { email, email_error, password, password_error, name, name_error, nik, nik_error, role, role_error } = form || {}

  const disabledButton = () => {
    return !isEmpty(email) && !isEmpty(password) && !isEmpty(name) && !isEmpty(nik) && !isEmpty(role)
  }

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  const handleNext = async() => {
    resetStateErrors(setForm)
    setLoading(true)

    const res = await postCheckUnique({ email, password, name, nik, role })
    if(!isEmpty(res?.error?.validator)) setForm((prev) => ({...prev, ...res?.error?.validator}))

    setLoading(false)

    if(res.status === 200) navigation.navigate('FinalRegister', {email, password, name, nik, role})
  }

  return (
    <Container useEarlyReturn useSafeArea >
      <Header useBack title="" noShadow />
      <Container useKeyboardAvoidingView usePaddingHorizontal style={{ paddingVertical:20 }}>
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
        value={email}
        onChangeText={(value) => updateStateField(setForm, 'email', value)}
        title=""
        placeholder="Masukan email"
        containerStyle={{ paddingTop:30 }}
        error={email_error}
        />
       <TextInput
        value={password}
        onChangeText={(value) => updateStateField(setForm, 'password', value)}
        title=""
        placeholder="Masukan password"
        containerStyle={{ paddingTop:8 }}
        secureTextEntry
        error={password_error}
        />
        <TextInput
        value={name}
        onChangeText={(value) => updateStateField(setForm, 'name', value)}
        title=""
        placeholder="Masukan nama"
        containerStyle={{ paddingTop:8 }}
        error={name_error}
        />
       <TextInput
        value={nik}
        onChangeText={(value) => updateStateField(setForm, 'nik', value)}
        title=""
        placeholder="Masukan NIK"
        containerStyle={{ paddingTop:8 }}
        keyboardType={'number'}
        error={nik_error}
        />
       <TextInput
        value={role}
        onChangeText={(value) => updateStateField(setForm, 'role', value)}
        title=""
        placeholder="Masukan role"
        containerStyle={{ paddingTop:8 }}
        error={role_error}
        />
      <Button loading={loading} disabled={!disabledButton()} containerStyle={{ width: "100%", marginTop: 15 }} onPress={handleNext}>Lanjutkan</Button>
      <Text textStyle={{ textAlign:"center" , paddingTop : 20 }} fontSize={15} fontWeight="bold" onPress={handleLogin}>Sudah punya akun</Text>
      </Container>
    </Container>
  );
};

export default Register;
