// Ini Untuk di Halaman Profile
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "../atoms/Icon"; // sesuaikan path
import Text from "../atoms/Text"; // komponen custom kamu

const ListProfile = ({ iconName, label, value, onPress }) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
      }}
    >
      <Icon name={iconName} size={20} color="gray" />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text fontWeight="bold" fontSize={14}>
          {label}
        </Text>
        <Text color="gray" fontSize={13}>
          {value}
        </Text>
      </View>
    </Wrapper>
  );
};

export default ListProfile;
