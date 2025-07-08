import React, { useEffect, useState } from "react";
import Container from "../../atomic/atoms/Container";
import Image from "../../atomic/atoms/Image";
import Header from "../../atomic/molecules/Header";
import Text from "../../atomic/atoms/Text";
import { COLORS } from "../../utils/themes";
import TextInput from "../../atomic/atoms/TextInput";
import Button from "../../atomic/atoms/Button";
import { resetStateErrors, updateStateField } from "../../utils/script";
import { Keyboard } from "react-native";
import isEmpty from "lodash/isEmpty";
import { forgotPassword, postForgotPassword } from "../../services/apis/invite";
import { useNavigation } from "@react-navigation/native";



const ForgotPassword = () => {
  const [loading, setLoading] = useState();
  const [isError, setIsError] = useState(false)
  const [form, setForm] = useState({
    email: "",
    email_error: "",
  });

  const { email,email_error } = form || {};

  const handleForgotPassword = async () => {
    Keyboard.dismiss();
    setForm(resetStateErrors(form));
    setLoading(true);

    const res = await postForgotPassword(form)
    if (!isEmpty(res?.error?.validator))
      setForm((prev) => ({ ...prev, ...res?.error?.validator}));
    else if(!isEmpty(res?.error)) setIsError(true)

    setLoading(false);
    if(res.status === 200)
      setForm({email : ""})
  };
  const disabledButton = () => {
    return !isEmpty(email);
  };

  return (
    <Container useEarlyReturn useSafeArea>
      <Header useBack title="" noShadow />
      <Container usePaddingHorizontal useKeyboardAvoidingView useScrollView>
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
          Kami siap bantu! Isi email kamu, lalu cek kotak masuk untuk reset
          password.
        </Text>
        <TextInput
          title=""
          placeholder="Masukan email"
          error={email_error}
          isError={isError}
          value={email}
          containerStyle={{ paddingTop: 32 }}
          onChangeText={(value) => updateStateField(setForm, "email", value)}
        />
        <Button
          containerStyle={{ width: "100%", marginTop: 15 }}
          onPress={handleForgotPassword}
          disabled={!disabledButton()}
          loading={loading}
        >
          Kirim
        </Button>
      </Container>
    </Container>
  );
};

export default ForgotPassword;
