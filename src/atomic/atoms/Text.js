import React from "react";
import { Text as TextRN, TouchableOpacity, View } from "react-native";
import { moderateScale } from "../../utils/script";
import { COLORS } from "../../utils/themes";

const Text = ({
  children,
  containerStyle,
  textStyle,
  fontSize = 14,
  fontWeight = "400", // 400 = normal, 500 = medium, 600 = semi-bold, 700 = bold
  color = COLORS.BLACK,
  onPress,
}) => {
  if (!children) return null;
  
  const Wrapper = onPress ? TouchableOpacity : View;
  fontSize = moderateScale(fontSize);

  return (
    <Wrapper
      onPress={onPress}
      style={containerStyle}
    >
      <TextRN
        style={{ fontSize, color, fontWeight, ...textStyle }}
        allowFontScaling={false}
      >
        {children}
      </TextRN>
    </Wrapper>
  );
};

export default Text;
