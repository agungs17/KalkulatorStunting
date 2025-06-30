import React, { useEffect, useState } from "react";
import Container from "./Container";
import Text from "./Text";
import { TextInput as TextInputRN, Pressable, Platform } from "react-native";
import { COLORS } from "../../utils/themes";
import { isFunction, isEmpty } from "lodash-es";
import { dateFormatter, moderateScale } from "../../utils/script";
import Icon from "@react-native-vector-icons/material-design-icons";
import DatePicker from "react-native-date-picker";

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
  isError = false,
  error,

  useDatePicker = false,
  dateMode = 'datetime', // 'date' | 'time' | 'datetime'
  minimumDate,
  maximumDate = new Date(),
}) => {
  const [lock, setLock] = useState(secureTextEntry);
  const [open, setOpen] = useState(false);
  const bgColor = isError || !isEmpty(error) ? COLORS.SECONDARY_RED : COLORS.SECONDARY_GREEN;
  const color = isError || !isEmpty(error) ? COLORS.RED : COLORS.BLACK;

  useEffect(() => {
    if (!secureTextEntry) setLock(false);
  }, [secureTextEntry]);

  const titleDatePicker = () => {
    switch (dateMode) {
      case 'datetime':
        return 'Pilih tanggal & waktu';
      case 'date':
        return 'Pilih tanggal';
      case 'time':
        return 'Pilih waktu';
      default:
        return 'Pilih tanggal';
    }
  };

  const getFormattedDate = () => {
    if (!value) return null;

    switch (dateMode) {
      case 'date':
        return dateFormatter(value);
      case 'time':
        return dateFormatter(value, 'HH:mm');
      case 'datetime':
      default:
        return dateFormatter(value, 'DD MMMM YYYY HH:mm');
    }
  };

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
          paddingVertical: 10,
          borderColor: color,
          borderRadius: 10,
          backgroundColor: bgColor,
          paddingLeft: leftComponent ? moderateScale(14) : moderateScale(10),
          paddingRight: rightComponent || secureTextEntry || useDatePicker ? moderateScale(14) : moderateScale(10),
        }}
      >
        {leftComponent && isFunction(leftComponent) ? leftComponent() : leftComponent}

        {useDatePicker ? (
          <Pressable
            style={{ flex: 1, height: 37, justifyContent: 'center' }}
            onPress={() => setOpen(true)}
          >
            <Text color={value ? '#000' : '#888'}>
              {getFormattedDate() || placeholder}
            </Text>
          </Pressable>
        ) : (
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
              flex: 1,
              height: 37,
              color: '#000',
            }}
          />
        )}

        {secureTextEntry ? (
          lock ? (
            <Icon name="eye" size={20} color={COLORS.BLACK} onPress={() => setLock(false)} />
          ) : (
            <Icon name="eye-off" size={20} color={COLORS.BLACK} onPress={() => setLock(true)} />
          )
        ) : rightComponent && isFunction(rightComponent) ? rightComponent() : rightComponent}
      </Container>

      {error && (
        <Text fontSize={13.5} fontWeight="400" color={COLORS.RED} containerStyle={{ paddingTop: 2 }}>
          {error}
        </Text>
      )}

      {useDatePicker && (
        <DatePicker
          modal
          title={titleDatePicker()}
          confirmText='Pilih'
          cancelText='Kembali'
          open={open}
          date={value ? new Date(value) : new Date()}
          locale="id"
          is24hourSource
          mode={dateMode}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onConfirm={(date) => {
            setOpen(false);
            onChangeText(date);
          }}
          onCancel={() => setOpen(false)}
        />
      )}
    </Container>
  );
};

export default TextInput;