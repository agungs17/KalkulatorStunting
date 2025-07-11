import React from "react";
import { View } from "react-native";
import Container from "../../atomic/atoms/Container";
import Header from "../../atomic/molecules/Header";
import Text from "../../atomic/atoms/Text";
import TextInput from "../../atomic/atoms/TextInput";
import Button from "../../atomic/atoms/Button";
import Image from "../../atomic/atoms/Image";
import OptionSelect from "../../atomic/atoms/OptionSelect";

const FormTambahAnak = () => {
  return (
    <Container useEarlyReturn useSafeArea>
      <Header useBack title="Tambah Anak" />
      <Container usePaddingHorizontal>
        <View style={{ alignItems: "center" }}>
          <Image
            width={300}
            height={300}
            source={require("../../assets/image/formtambahanak.png")}
          />
        </View>
        <View>
          <Text
            fontSize={16}
            textStyle={{ textAlign: "center", marginBottom: 15 }}
          >
            Tambahkan data anak untuk mulai memantau pertumbuhan dan status
            gizinya secara teratur!
          </Text>
          <Text
            fontSize={20}
            fontWeight="bold"
            containerStyle={{
              alignItems: "center",
              marginBottom: 30,
              textAlign: "center",
            }}
          >
            Form Tambah Anak
          </Text>

          <TextInput
            title=""
            placeholder="Masukkan NIK Anak(Optional)"
            keyboardType={"number-pad"}
          />
          <TextInput title="" placeholder="Masukkan Nama Anak" />
          <TextInput
            title=""
            placeholder="YYYY-MM-DD"
            dateMode="date"
            useDatePicker
          />
          <OptionSelect
            title="Jenis Kelamin Anak"
            options={[
              { label: "Laki-laki", value: "L" },
              { label: "Perempuan", value: "P" },
            ]}
          />
          <Button containerStyle={{ width: 150, alignSelf: "center",marginTop:10 }}>
            Kirim
          </Button>
        </View>
      </Container>
    </Container>
  );
};

export default FormTambahAnak;
