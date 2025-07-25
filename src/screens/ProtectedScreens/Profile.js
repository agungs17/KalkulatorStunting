import React from "react";
import Container from "../../atomic/atoms/Container";
import authStore from "../../zustand/authStore";
import { deleteLogout } from "../../services/apis/auth";
import Text from "../../atomic/atoms/Text";
import { Image, View } from "react-native";
import { COLORS } from "../../utils/themes";
import ProfileList from "../../atomic/molecules/ProfileList";
import Icon from "@react-native-vector-icons/material-design-icons";

const Profile = ({ navigation }) => {
  const { user } = authStore();
  const { name, email } = user;

  const handleLogout = async () => {
    await deleteLogout();
  };
  const handleForgot = () => {
    navigation.navigate("ForgotPassword");
  };
   const handleTambahTeam = () => {
    navigation.navigate("TeamPosyandu");
  };
  return (
    <Container useEarlyReturn useSafeArea usePaddingHorizontal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 50,
          paddingLeft: 10,
        }}
      >
        <Image
          source={require("../../assets/image/orangtua.png")}
          style={{
            width: 110,
            height: 110,
            borderRadius: 100,
            backgroundColor: "gray",
            transform: [{ rotate: "-10deg" }],
          }}
        />
        <View style={{ flex: 1, paddingLeft: 30 }}>
          <Text fontSize={20} fontWeight="bold" color={COLORS.GREEN}>
            {name}
          </Text>
          <Text color="gray" containerStyle={{ paddingTop: 7 }}>
            {email}
          </Text>
          <View>
            <Text color={COLORS.BLUE} containerStyle={{ paddingTop: 10 }}>
              Edit Profile
            </Text>
            <Icon Icon />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <ProfileList iconName="book-open-outline" label="Lihat Artikel" />
        <ProfileList
          iconName="account-plus-outline"
          label="Data Anak"
        />
         <ProfileList
          iconName="account-plus-outline"
          label="Anggota Team"
          onPress={handleTambahTeam}
        />
        <ProfileList
          iconName="key-variant"
          label="Lupa Password"
          onPress={handleForgot}
        />
        <ProfileList iconName="logout" label="Keluar" onPress={handleLogout} />
      </View>
    </Container>
  );
};

export default Profile;
