import React from "react";
import { View } from "react-native";
import Container from "../../atomic/atoms/Container";
import Text from "../../atomic/atoms/Text";
import Image from "../../atomic/atoms/Image";
import Icon from "../../atomic/atoms/Icon";
import authStore from "../../zustand/authStore";
import HomepageIcon from "../../atomic/molecules/HomepageIcon";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Homepage = ({ navigation }) => {
  const { user } = authStore();
  const { name } = user;

  const handleInformasi = () => {
    navigation.navigate("Informasi");
  };
  const handleTeamPosyandu = () => {
    navigation.navigate("TeamPosyandu");
  };
  const handleResep = () => {
    navigation.navigate("Resep");
  };
  const handlePerkembangan = () => {
    navigation.navigate("Perkembangan");
  };
   const handleTambahAnak = () => {
    navigation.navigate("FormTambahAnak");
  };
  return (
    <Container useEarlyReturn useSafeArea>
      <Container usePaddingHorizontal>
        <ScrollView>
        {/* Header */}
        <View style={{ marginTop: 20 }}>
          <Text fontSize={20}>Hello, {name}</Text>
          <Text fontSize={16} color="#666">
            Selamat datang
          </Text>
        </View>
        {/* Banner */}
        <View style={{ alignItems: "center", marginTop: 25 }}>
          <Image
            width={355}
            height={180}
            borderRadius={12}
            source={require("../../assets/image/makanan.webp")}
          />
        </View>
        {/* Icon plus */}
        <View style={{ alignItems: "flex-end", marginTop: 20 }}>
          <TouchableOpacity activeOpacity={0.7} onPress={handleTambahAnak}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                backgroundColor: "#e0e0e0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="plus" size={50} color="#333" />
            </View>
          </TouchableOpacity>
        </View>
        {/* Icon plus end */}
        {/* Ringkasan */}
        <Text
          fontSize={20}
          fontWeight="bold"
          containerStyle={{ marginTop: 24 }}
        >
          Ringkasan
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 16,
            paddingHorizontal: 4,
          }}
        >
          {/* BB/U */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#F0F0F0",
              borderRadius: 12,
              padding: 16,
              marginRight: 8,
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Icon
                name="food-apple-outline"
                size={28}
                color="#15B082"
                containerStyle={{ marginBottom: 8 }}
              />
              <Text
                fontSize={14}
                fontWeight="600"
                color="#444"
                style={{ textAlign: "left" }}
              >
                Berat Badan / Umur
              </Text>
              <Text
                fontSize={14}
                fontWeight="bold"
                color="#222"
                containerStyle={{ textAlign: "left", paddingTop: 5 }}
              >
                Gizi Kurang
              </Text>
            </View>
          </View>
          {/* BB/U End */}
          {/* TB/U */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#E6E6E6",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Icon
                name="ruler"
                size={28}
                color="#F2994A"
                containerStyle={{ marginBottom: 8 }}
              />
              <Text
                fontSize={14}
                fontWeight="600"
                color="#444"
                containerStyle={{ textAlign: "left" }}
              >
                Tinggi Badan / Umur
              </Text>
              <Text
                fontSize={14}
                fontWeight="bold"
                color="#222"
                containerStyle={{ textAlign: "left", paddingTop: 5 }}
              >
                Pendek
              </Text>
            </View>
          </View>
          {/* TB/U End */}
          {/* BB/TB */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#E6E6E6",
              borderRadius: 12,
              padding: 16,
              marginLeft: 8,
            }}
          >
            <View style={{ alignItems: "flex-start" }}>
              <Icon
                name="human"
                size={28}
                color="#2F80ED"
                containerStyle={{ marginBottom: 8 }}
              />
              <Text
                fontSize={14}
                fontWeight="600"
                color="#444"
                continerStyle={{ textAlign: "left", paddingTop: 5 }}
              >
                Berat Badan / Tinggi Badan
              </Text>
              <Text
                fontSize={15}
                fontWeight="bold"
                color="#222"
                containerStyle={{ textAlign: "left", paddingTop: 5 }}
              >
                kurus
              </Text>
            </View>
          </View>
        </View>
        {/* BB/TB End */}
        {/* Info Pencegahan */}
        <View
          style={{
            backgroundColor: "#15B082",
            borderRadius: 12,
            padding: 20,
            marginTop: 24,
          }}
        >
          <Text
            fontSize={16}
            fontWeight="bold"
            color="white"
            containerStyle={{ marginBottom: 6 }}
          >
            Tumbuh Sehat Tanpa Stunting
          </Text>
          <Text fontSize={12} color="white" lineHeight={18}>
            Asupan bergizi seimbang penting sejak dini untuk mencegah risiko
            stunting pada anak.
          </Text>
        </View>

        {/* Terkait 4 icon */}
        <Text
          fontSize={20}
          fontWeight="bold"
          containerStyle={{ marginTop: 28, marginBottom: 25 }}
        >
          Terkait
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 50,
            }}
          >
            <HomepageIcon
              iconName="baby-face"
              label="Perkembangan"
              color="#15B082"
              onPress={handlePerkembangan}
            />
            <HomepageIcon
              iconName="food-fork-drink"
              label="Resep"
              color="#F2994A"
              onPress={handleResep}
            />
            <HomepageIcon
              iconName="account-group-outline"
              label="Tim Posyandu"
              color="#2F80ED"
              onPress={handleTeamPosyandu}
            />
            <HomepageIcon
              iconName="information-outline"
              label="Informasi"
              color="#27AE60"
              onPress={handleInformasi}
            />
          </View>
        </View>
        </ScrollView>
      </Container>
    </Container>
  );
};

export default Homepage;
