import React, { useState } from "react";
import Container from "../../atomic/atoms/Container";
import Header from "../../atomic/molecules/Header";
import Text from "../../atomic/atoms/Text";
import { COLORS } from "../../utils/themes";
import Button from "../../atomic/atoms/Button";
import { Keyboard, View } from "react-native";
import { horizontalScale, resetStateErrors, updateStateField } from "../../utils/script";
import FormChildren from "../../atomic/molecules/FormChildren";
import { postRegister } from "../../services/apis/auth";
import {isEmpty} from "lodash-es"

const FinalRegister = ({navigation, route}) => {
  const [loading, setLoading] = useState(false)
  const [children, setChildren] = useState([]);

  const handleAddChildren = () => {
    setChildren((prev) => [
      ...prev,
      { nik: "", name: "", date_of_birth: "", gender: "" },
    ]);
  };

  const removeChildAt = (indexToRemove) => {
    const dataFilter = children.filter((_, index) => index !== indexToRemove);
    setChildren(dataFilter);
  };

  const handleRegister = async() => {
    Keyboard.dismiss()
    setChildren(resetStateErrors(children))
    setLoading(true)

    const res = await postRegister({...route?.params, children})
    if (!isEmpty(res?.error?.validator?.children)) {
        setChildren(prev =>
            prev.map((child, index) => {
                const data = { ...child, ...(res.error.validator.children[index] || {})}
                return data
            })
        );
    }
    setLoading(false)

     if(res.status === 200) navigation.navigate('OnBoardingAuth')
  }

  return (
    <Container useEarlyReturn useSafeArea>
      <Header useBack title="" noShadow />
      <Container
        useKeyboardAvoidingView
        useScrollView
        usePaddingHorizontal
        style={{ paddingVertical: 20 }}
      >
        <Text
          fontSize={28}
          fontWeight="bold"
          color={COLORS.GREEN}
          textStyle={{ textAlign: "center" }}
        >
          Tambah data anak
        </Text>
        <Text
          fontWeight="bold"
          fontSize={17}
          textStyle={{ textAlign: "center" }}
          containerStyle={{ paddingTop: 10 }}
        >
          Tambahkan anak agar lebih personal 👶 Tapi tenang, kamu bisa lewati ini.
        </Text>
        {children.length === 0 && (
          <Text
            fontWeight="medium"
            fontSize={15}
            color="gray"
            textStyle={{ textAlign: "center", marginTop: 20 }}
          >
            Data anak belum ada, tekan "+ Tambah data anak".
          </Text>
        )}
        {children.map((data, index) => {
          const { nik, nik_error, name, name_error, date_of_birth, date_of_birth_error, gender, gender_error, } = data || {};
          
          return (
            <FormChildren
              key={index}
              nik={nik}
              nik_error={nik_error}
              name={name}
              name_error={name_error}
              date_of_birth={date_of_birth}
              date_of_birth_error={date_of_birth_error}
              gender={gender}
              gender_error={gender_error}
              setState={(object, value) =>
                updateStateField(setChildren, object, value, index)
              }
              onDelete={() => removeChildAt(index)}
            />
          );
        })}
        <Button
          type="outline"
          containerStyle={{ width: "100%", marginTop: 15 }}
          onPress={handleAddChildren}
        >
          + Tambah data anak
        </Button>
      </Container>
      <View
        style={{
          paddingHorizontal: horizontalScale(20),
          paddingVertical: 15,
          borderTopWidth: 0.5,
          borderColor: "gray",
        }}
      >
        <Button containerStyle={{ width: "100%" }} onPress={handleRegister} loading={loading}>Buat akun</Button>
      </View>
    </Container>
  );
};

export default FinalRegister;
