import React from "react";
import Container from "../atomic/atoms/Container";
import Header from "../atomic/molecules/Header";
import Text from "../atomic/atoms/Text";
import { COLORS } from "../utils/themes";
import { View } from "react-native";
import Image from "../atomic/atoms/Image";
import Button from "../atomic/atoms/Button";
import Icon from "../atomic/atoms/Icon";

const Profile = ({ navigation }) => {
  const handleScan = () => {
    navigation.navigate("ScanBarcode");
  };
  const handlleRiwayat=()=>{
    navigation.navigate("RiwayatBalita");
  }
  return (
    <Container useEarlyReturn useSafeArea>
      <Header
        useBack
        title=""
        noShadow
        style={{ backgroundColor: "#67AE6E" }}
        titleStyle={{ color: "#fff" }}
      />
      <Container>
        <View
          style={{
            backgroundColor: "#67AE6E",
            padding: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text
            fontSize={30}
            color={COLORS.WHITE}
            fontWeight="bold"
            containerStyle={{ paddingBottom: 15 }}
          >
            Profile
          </Text>

          <Image
            width={180}
            height={180}
            source={require("../assets/image/ibuanak.png")}
          />

          <Text
            fontSize={25}
            color={COLORS.WHITE}
            containerStyle={{ paddingTop: 15 }}
          >
            Rivan Setiawan
          </Text>
          <Text color={COLORS.WHITE} fontSize={17}>
            0000123128381819
          </Text>
          <Text color={COLORS.WHITE} fontSize={17}>
            User
          </Text>

          <Icon
            name="qrcode-scan"
            size={60}
            color="white"
            containerStyle={{
              padding: 10,
              marginTop: 10,
              backgroundColor: "green",
              borderRadius: 10,
            }}
            onPress={handleScan}
          />
        </View>
            <Container style={{ padding: 20 }} usePaddingHorizontal>
             <Text fontSize={18} fontWeight="bold" containerStyle={{ marginBottom: 15 }}>
                Daftar Anak
            </Text>
            <Button
            containerStyle={{ marginBottom: 5, width:"100%" }}
            onPress={handlleRiwayat}
            >
            Rizki 
            </Button>

            <Button
            containerStyle={{ marginBottom: 5, width:"100%" }}
            onPress={handlleRiwayat}
            >
            Salsabila Aulia
            </Button>
              <Button
            containerStyle={{ marginBottom: 5, width:"100%" }}
            onPress={handlleRiwayat}
            >
            Salsabila Aulia
            </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default Profile;
