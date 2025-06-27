import React, { useEffect, useState } from "react";
import Container from "./Container";
import Text from "./Text";
import { TextInput as TextInputRN } from "react-native";
import { COLORS } from "../../utils/themes";
import { isFunction } from "lodash-es";
import { moderateScale } from "../../utils/script";
import Icon from "@react-native-vector-icons/material-design-icons";
import {isEmpty} from 'lodash-es'

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
    containerStyle = {},
    error
 }) => {
  const [lock, setLock] = useState(secureTextEntry);
  const isError = !isEmpty(error) || false
  const bgColor = isError ? COLORS.SECONDARY_RED : COLORS.SECONDARY_GREEN
  const color = isError ? COLORS.RED : COLORS.BLACK;

  useEffect(() => {
    if (!secureTextEntry) setLock(false);
  }, [secureTextEntry])

  return (
    <Container noFlex style={{ paddingBottom: 12, ...containerStyle }}>
      <Text color={color} containerStyle={{ paddingBottom: 3 }}>
        {title}
      </Text>
      <Container
        noFlex
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical:10,
          borderColor: color,
          borderRadius: 10,
          backgroundColor: bgColor,
          paddingLeft: leftComponent ? moderateScale(14) : moderateScale(10),
          paddingRight: rightComponent || secureTextEntry ? moderateScale(14) : moderateScale(10),
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
          placeholderTextColor="#888"
          secureTextEntry={lock}
          style={{
            flex : 1,
            height: 37,
            color: '#000',
          }}
        />
        {secureTextEntry ? lock ? <Icon name="eye" size={20} color={COLORS.BLACK} onPress={() => setLock(false)} /> : <Icon name="eye-off" size={20} color={COLORS.BLACK} onPress={() => setLock(true)} /> : rightComponent && isFunction(rightComponent) ? rightComponent() : rightComponent}
      </Container>
      {error && (
        <Text
          fontSize={13.5}
          fontWeight="400"
          color={COLORS.RED}
          containerStyle={{ paddingTop: 2 }}
        >
          {error}
        </Text>
      )}
    </Container>
  );
};

export default TextInput;
