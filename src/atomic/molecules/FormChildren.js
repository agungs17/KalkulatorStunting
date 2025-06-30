import React from "react";
import { View } from "react-native";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import { COLORS } from "../../utils/themes";
import TextInput from "../atoms/TextInput";
import { isEmpty, isFunction } from "lodash-es";
import OptionSelect from "../atoms/OptionSelect";

const FormChildren = ({
  id,
  nik,
  nik_error,
  name,
  name_error,
  date_of_birth,
  date_of_birth_error,
  gender,
  gender_error,
  setState,
  onDelete,
}) => {
  const isHasId = !isEmpty(id) || false;

  const handleDelete = () => {
    if (isHasId) {
      //  add function delete when has id
    } else if (isFunction(onDelete)) {
      onDelete();
    }
  };

  const handleState = (object, value) => {
    if (isHasId) {
      //  add function update in local state when has id
    } else if (isFunction(setState)) {
      setState(object, value);
    }
  };

  return (
    <View
      style={{
        marginTop: 15,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1.5,
        borderColor: "gray",
        borderRadius: 20,
      }}
    >
      <Button
        containerStyle={{ alignSelf: "flex-end" }}
        paddingHorizontal={10}
        paddingVertical={0}
        btnColor={COLORS.RED}
        onPress={handleDelete}
      >
        <Icon size={14} name={"delete"} color={COLORS.WHITE} />
        <Text color={COLORS.WHITE} fontSize={12} fontWeight="bold">
          Hapus
        </Text>
      </Button>
      <TextInput
        value={name}
        onChangeText={(value) => handleState("name", value)}
        title="Nama Anak"
        placeholder="Masukan Nama Anak"
        containerStyle={{ paddingTop: 8 }}
        error={name_error}
      />
      <TextInput
        value={nik}
        onChangeText={(value) => handleState("nik", value)}
        title="NIK Anak (Optional)"
        placeholder="Masukan NIK Anak (Optional)"
        containerStyle={{ paddingTop: 8 }}
        keyboardType={"number-pad"}
        error={nik_error}
      />
      <TextInput
        value={date_of_birth}
        useDatePicker
        dateMode="date"
        onChangeText={(value) => handleState("date_of_birth", value)}
        title="Tanggal Lahir Anak"
        placeholder="Masukan Tanggal Lahir Anak"
        containerStyle={{ paddingTop: 8 }}
        error={date_of_birth_error}
      />
      <OptionSelect
        value={gender}
        title="Jenis Kelamin Anak"
        options={[
          { label: 'Laki-laki', value: 'L' },
          { label : 'Perempuan', value : 'P' }
        ]}
        onChange={(value) => handleState("gender", value)}
        error={gender_error}
      />
    </View>
  );
};

export default FormChildren;
