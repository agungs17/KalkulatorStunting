import React from "react";
import { View, TouchableOpacity } from "react-native";
import Container from "../../atomic/atoms/Container";
import Text from "../../atomic/atoms/Text";
import Header from "../../atomic/molecules/Header";
import Icon from "../../atomic/atoms/Icon";
import { ScrollView } from "react-native";
import authStore from "../../zustand/authStore";
import { COLORS } from "../../utils/themes";

const TeamPosyandu = ({ navigation }) => {
  const { user } = authStore();

  const team_name = user?.team?.team_name ?? "Kamu belum mempunyai tim";
  const teamMembers = user?.team?.teams || [];

  const handleTambahTeam = () => {
    navigation.navigate("FormTambahTeam");
  };

  const handleTambahAnggota = () => {
    navigation.navigate("TambahAnggotaTeam");
  };

  return (
    <Container useSafeArea>
      <Header useBack title="" />
      <Container usePaddingHorizontal>
        <ScrollView>
          {/* Tombol buat tim */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 30,
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text fontSize={20} fontWeight="bold">
              Tim Posyandu
            </Text>

            {!user?.team?.team_name && (
              <TouchableOpacity onPress={handleTambahTeam} activeOpacity={0.7}>
                <View
                  style={{
                    width: 80,
                    height: 35,
                    borderRadius: 5,
                    backgroundColor: "#15B082",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text fontWeight="bold" color={COLORS.WHITE}>
                    Buat Tim
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Card Tim Posyandu */}
          <View
            activeOpacity={0.8}
            style={{
              backgroundColor: "#F6F6F6",
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 1,
              elevation: 1,
            }}
          >
            <Icon
              name="account-group-outline"
              size={28}
              color="#2F80ED"
              containerStyle={{ marginRight: 12 }}
            />
            <View>
              <Text fontSize={16} color={COLORS.BLACK} fontWeight="bold">
                {team_name}
              </Text>
            </View>
          </View>

          {/* Tombol tambah anggota */}
          {user?.team?.team_name && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text fontSize={18} fontWeight="bold">
                Tambah Anggota
              </Text>
              <TouchableOpacity
                onPress={handleTambahAnggota}
                activeOpacity={0.7}
              >
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 20,
                    backgroundColor: "#e0e0e0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon name="plus" size={22} color="#333" />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Kumpulan Team Yang Telah Terdaftar */}
          {teamMembers.map((member, index) => (
            <View
              key={index}
              activeOpacity={0.8}
              style={{
                backgroundColor: "#F6F6F6",
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
                elevation: 1,
              }}
            >
              <Icon
                name="account-group-outline"
                size={28}
                color="#2F80ED"
                containerStyle={{ marginRight: 12 }}
              />
              <View>
                <Text fontSize={16} color={COLORS.BLACK} fontWeight="bold">
                  {member.name}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Container>
    </Container>
  );
};

export default TeamPosyandu;
