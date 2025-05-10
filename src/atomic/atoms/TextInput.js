import React from "react";
import Container from "./Container";
import Text from "./Text";
import { TextInput as TextInputRN } from "react-native";
import { COLORS } from "../../utils/themes";

const TextInput = ({ 
    title = "Text title",
     errorMsg
 }) => {
  const color = errorMsg ? COLORS.RED : COLORS.BLACK;

  return (
    <Container style={{ paddingBottom: 10 }}>
      <Text color={color} containerStyle={{ paddingBottom: 3 }}>
        {title}
      </Text>
      <Container
        style={{
          flexDirection: "row",
          borderWidth: 0.8,
          borderColor: color,
          borderRadius: 5,
          backgroundColor: "transparent",
        }}
      >
        <TextInputRN
          allowFontScaling={false}
          style={{
            height: 40,
          }}
        />
      </Container>
      {errorMsg && (
        <Text
          fontSize={13.5}
          fontWeight="400"
          color={COLORS.RED}
          containerStyle={{ paddingTop: 2 }}
        >
          {errorMsg}
        </Text>
      )}
    </Container>
  );
};

export default TextInput;
