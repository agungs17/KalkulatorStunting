import React, { useEffect, useState } from "react";
import Container from "./Container";
import Text from "./Text";
import { TextInput as TextInputRN } from "react-native";
import { COLORS } from "../../utils/themes";
import { isFunction } from "lodash-es";
import { moderateScale } from "../../utils/script";
import Icon from "@react-native-vector-icons/material-design-icons";

const TextInput = ({ 
    title = "Your title",
    value,
    onChangeText = () => {},
    placeholder = "Your placeholder",
    keyboardType = 'default',
    secureTextEntry = false,
    maxLength = null,
    leftComponent = null,
    rightComponent = null,
    errorMsg
 }) => {
  const [lock, setLock] = useState(secureTextEntry);
  const color = errorMsg ? COLORS.RED : COLORS.BLACK;

  useEffect(() => {
    if (!secureTextEntry) setLock(false);
  }, [secureTextEntry])

  return (
    <Container noFlex style={{ paddingBottom: 10 }}>
      <Text color={color} containerStyle={{ paddingBottom: 3 }}>
        {title}
      </Text>
      <Container
        noFlex
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: color,
          borderRadius: 5,
          backgroundColor: "transparent",
          paddingLeft: leftComponent ? moderateScale(8) : moderateScale(4),
          paddingRight: rightComponent || secureTextEntry ? moderateScale(8) : moderateScale(4),
        }}
      >
        {leftComponent && isFunction(leftComponent) ? leftComponent() : leftComponent}
        <TextInputRN
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          allowFontScaling={false}
          autoCorrect={false}
          keyboardType={keyboardType}
          placeholder={placeholder}
          secureTextEntry={lock}
          style={{
            flex : 1,
            height: 40,
          }}
        />
        {secureTextEntry ? lock ? <Icon name="eye" size={20} color={COLORS.BLACK} onPress={() => setLock(false)} /> : <Icon name="eye-off" size={20} color={COLORS.BLACK} onPress={() => setLock(true)} /> : rightComponent && isFunction(rightComponent) ? rightComponent() : rightComponent}
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
