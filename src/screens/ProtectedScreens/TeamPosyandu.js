import React from "react";
import { View, TouchableOpacity } from "react-native";
import Container from "../../atomic/atoms/Container";
import Text from "../../atomic/atoms/Text";
import Header from "../../atomic/molecules/Header";
import Icon from "../../atomic/atoms/Icon";
import { ScrollView } from "react-native";

const TeamPosyandu = ({ navigation }) => {

  const handleTambahTeam = () => {
    navigation.navigate("FormTambahTeam");
  };
  return (
    <Container useSafeArea>
      <Header useBack title="Tim Posyandu" />
      <Container usePaddingHorizontal>
        <ScrollView>
        {/* Tombol tambah tim */}
          <View
            style={{
              flexDirection: "row",
              marginTop:30,
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            
            <Text fontSize={20} fontWeight="bold">
              Daftar Tim
            </Text>

           
            <TouchableOpacity
              onPress={handleTambahTeam}
              activeOpacity={0.7}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
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
          {/* Tombol tambah tim */}
          {/* Card Tim Posyandu */}
          <TouchableOpacity
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
              <Text fontSize={16} fontWeight="bold">
                Agung Setiadi
              </Text>
              <Text fontSize={13} color="#666">
                Dibuat pada: 09 Juli 2025
              </Text>
            </View>
          </TouchableOpacity>

          {/* Tambah beberapa card dummy lagi kalau mau */}
          <TouchableOpacity
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
              <Text fontSize={16} fontWeight="bold">
                Rivan Setiawan
              </Text>
              <Text fontSize={13} color="#666">
                Dibuat pada: 01 Juli 2025
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    </Container>
  );
};

export default TeamPosyandu;
