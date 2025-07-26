import React, { useState } from "react";
import Container from "../../atomic/atoms/Container";
import Header from "../../atomic/molecules/Header";
import TextInput from "../../atomic/atoms/TextInput";
import Text from "../../atomic/atoms/Text";
import Button from "../../atomic/atoms/Button";
import { Keyboard, View } from "react-native";
import Image from "../../atomic/atoms/Image";
import { updateStateField } from "../../utils/script";
import { postCreateTeam } from "../../services/apis/team";
import isEmpty from "lodash/isEmpty";

const FormTambahTeam = ({ navigation }) => {
  const [team, setTeam] = useState({
    team_name: "",
  });

  const { team_name } = team || {};

  const handleTambahTeam = async () => {
    Keyboard.dismiss();

    const res = await postCreateTeam(team_name);
    if (res.status === 200) setTeam({ team_name: "" });
    navigation.navigate("TeamPosyandu");
  };

  const disabledButton = () => {
    return !isEmpty(team_name);
  };

  return (
    <Container useEarlyReturn useSafeArea>
      <Header useBack title="" />
      <Container usePaddingHorizontal>
        <View style={{ marginTop: 5, alignItems: "center" }}>
          <Image
            width={300}
            height={300}
            source={require("../../assets/image/Teamimage.jpg")}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            fontSize={20}
            fontWeight="bold"
            containerStyle={{ alignItems: "center", marginBottom: 15 }}
          >
            Bentuk Team
          </Text>
          <Text
            fontSize={16}
            textStyle={{ textAlign: "center", marginBottom: 20 }}
          >
            Mulai memantau pertumbuhan balita dan membagikan informasi penting
            secara terstruktur!
          </Text>
          <TextInput
            title=""
            placeholder="Masukan Nama Team"
            value={team_name}
            onChangeText={(value) =>
              updateStateField(setTeam, "team_name", value)
            }
          />
          <Button
            disabled={!disabledButton()}
            containerStyle={{ marginTop: 10, width: 150 }}
            onPress={handleTambahTeam}
          >
            Kirim
          </Button>
        </View>
      </Container>
    </Container>
  );
};
export default FormTambahTeam;
