// Ini untuk Homepage di bagian terkait paling bawah
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

const HomepageIcon = ({ iconName, label, color, onPress }) => {
  return (
    <View style={{ width: "23%", alignItems: "center", marginBottom: 20,marginLeft:7 }}>
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View
          style={{
            backgroundColor: color,
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Icon name={iconName} size={28} color="white" />
        </View>
      </TouchableOpacity>
      <Text
        fontSize={11.5}
        fontWeight="500"
        color="#444"
        textStyle={{ textAlign: "center" }}
      >
        {label}
      </Text>
    </View>
  );
};

export default HomepageIcon;
