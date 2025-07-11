import React from "react";
import { ScrollView, View } from "react-native";
import Container from "../../atomic/atoms/Container";
import Header from "../../atomic/molecules/Header";
import Text from "../../atomic/atoms/Text";
import Image from "../../atomic/atoms/Image";
import { COLORS } from "../../utils/themes";


const Informasi = ({navigation}) => {
    const handleResep = () => {
        navigation.navigate("Resep");
    }
  return (
    <Container>
      <Header useBack title="Informasi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container usePaddingHorizontal>
          <Text
            fontSize={22}
            fontWeight="bold"
            containerStyle={{ marginTop: 24, marginBottom: 16 }}
          >
            Fungsi Indikator Gizi Balita
          </Text>

          <View style={{ alignItems: "center", marginBottom: 24 }}>
            <Image
              width={320}
              height={320}
              source={require("../../assets/image/indikator.png")}
            />
          </View>

          {/* BB/U */}
          <View
            style={{
              backgroundColor: "#F9F9F9",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
          >
            <Text fontSize={16} fontWeight="bold" style={{ marginBottom: 8 }}>
              1. BB/U (Berat Badan menurut Umur)
            </Text>
            <Text fontSize={14} textStyle={{ textAlign: "justify" }}>
              BB/U menilai status gizi anak dengan membandingkan berat badan
              terhadap umur. Indikator ini bermanfaat untuk mengidentifikasi
              gizi kurang atau lebih, namun tidak dapat membedakan kekurangan
              gizi yang bersifat akut atau kronis.
            </Text>
          </View>

          {/* TB/U */}
          <View
            style={{
              backgroundColor: "#F1FAF6",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
          >
            <Text fontSize={16} fontWeight="bold" style={{ marginBottom: 8 }}>
              2. TB/U atau PB/U (Tinggi/Panjang Badan menurut Umur)
            </Text>
            <Text fontSize={14} textStyle={{ textAlign: "justify" }}>
              TB/U digunakan untuk melihat pertumbuhan linier anak dan
              mendeteksi stunting. Indikator ini mencerminkan masalah gizi
              kronis yang terjadi dalam jangka panjang akibat asupan gizi yang
              kurang.
            </Text>
          </View>

          {/* BB/TB */}
          <View
            style={{
              backgroundColor: "#FFF8F3",
              borderRadius: 12,
              padding: 16,
              marginBottom: 32,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
          >
            <Text fontSize={16} fontWeight="bold" style={{ marginBottom: 8 }}>
              3. BB/TB atau BB/PB (Berat Badan menurut Tinggi/Panjang Badan)
            </Text>
            <Text fontSize={14} textStyle={{ textAlign: "justify" }}>
              BB/TB menilai apakah berat badan anak sesuai dengan tinggi badan.
              Ini digunakan untuk mengetahui apakah anak mengalami wasting
              (kurus) atau overweight (obesitas).
            </Text>
          </View>
        </Container>
        {/* Bagian Bawah Footer*/}
        <View style={{ backgroundColor: "#A4B465", paddingHorizontal: 16 }}>
          <Text
            fontSize={14}
            fontWeight="bold"
            textStyle={{
              textAlign: "center",
              color: "white",
              marginTop: 15,
            }}
          >
            Asupan makanan yang sehat dengan rekomendasi gizi?
          </Text>
            <Text
              onPress={handleResep}
              fontSize={14}
              color={COLORS.BLUE}
              textStyle={{
                textAlign: "center",
                marginBottom: 15,
              }}
            >
              Lihat Asupan
            </Text>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Informasi;
