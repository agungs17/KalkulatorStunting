import React, { useState } from "react";
import Container from "../../atomic/atoms/Container";
import Header from "../../atomic/molecules/Header";
import TextInput from "../../atomic/atoms/TextInput";
import Text from "../../atomic/atoms/Text";
import { postAddTeam } from "../../services/apis/team";
import Button from "../../atomic/atoms/Button";
import { updateStateField } from "../../utils/script";
import isEmpty from "lodash/isEmpty";
import { Keyboard } from "react-native";

const TambahAnggotaTeam = () => {
  const [loading, setLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [addTeam, setAddTeam] = useState({
    email: "",
  });

  const { email } = addTeam || {};

  const handleTambahAnggota = async () => {
    Keyboard.dismiss();
    setLoading(true);
    const res = await postAddTeam(addTeam.email);

    if (!isEmpty(res?.error?.validator))
      setAddTeam((prev) => ({ ...prev, ...res?.error?.validator }));
    else if (!isEmpty(res?.error)) setIsError(true);

    setLoading(false);

    if (res.status === 200);
    setAddTeam({ email: "" });
  };
  
  const disabledButton = () =>{
    return !isEmpty(email)
  }

  return (
    <Container useSafeArea useEarlyReturn>
      <Header useBack title="" />
      <Container usePaddingHorizontal>
        <Text fontSize={20} containerStyle={{ padding: 20 }}>
          Tambah Anggota
        </Text>
        <TextInput
          placeholder="Masukan Email Pengguna"
          title=""
          isError={isError}
          value={email}
          onChangeText={(value) => updateStateField(setAddTeam, "email", value)}
        />
        <Button onPress={handleTambahAnggota} disabled={!disabledButton()} loading={loading}>
          Submit
        </Button>
      </Container>
    </Container>
  );
};

export default TambahAnggotaTeam;
