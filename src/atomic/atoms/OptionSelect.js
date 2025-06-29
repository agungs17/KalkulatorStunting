import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import { COLORS } from '../../utils/themes';
import { isEmpty } from 'lodash-es';

const OptionSelect = ({
  title = '',
  options = [],
  titleTextStyle,
  containerStyle,
  value,
  onChange,
  multiple = false,
  renderOption,
  isError,
  error
}) => {
  isError = isError || !isEmpty(error) || false;
  const color = isError ? COLORS.RED : COLORS.BLACK;

  const isSelected = (optionValue) => {
    if (multiple) return Array.isArray(value) && value.includes(optionValue);
    return value === optionValue;
  };

  const toggleOption = (optionValue) => {
    if (multiple) {
      const exists = Array.isArray(value) && value.includes(optionValue);
      const updated = exists ? value.filter((val) => val !== optionValue) : [...(value || []), optionValue];
      onChange?.(updated);
    } else {
      onChange?.(value === optionValue ? "" : optionValue);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text color={color} containerStyle={{ paddingBottom: 5 }} textStyle={titleTextStyle}>
        {title}
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {options.map((option, index) => {
          const selected = isSelected(option.value);
          const optionProps = {
            selected,
            option,
            onPress: () => toggleOption(option.value),
          };

          const optionColor = isError ? COLORS.RED : selected ? COLORS.GREEN : '#333';

          const optionStyle = [
            styles.option,
            selected && styles.optionSelected,
            isError && styles.optionError,
          ];

          return renderOption ? (
            <React.Fragment key={option.value || index}>
              {renderOption(optionProps)}
            </React.Fragment>
          ) : (
            <TouchableOpacity
              key={option.value || index}
              style={optionStyle}
              onPress={optionProps.onPress}
            >
              <Text
                fontSize={14.5}
                fontWeight={selected ? 'bold' : '400'}
                color={optionColor}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {!!error && (
        <Text
          fontSize={13.5}
          fontWeight="400"
          color={COLORS.RED}
          containerStyle={{ paddingTop: 2 }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
  },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  optionSelected: {
    borderColor: COLORS.GREEN,
    backgroundColor: COLORS.SECONDARY_GREEN,
  },
  optionError: {
    borderColor: COLORS.RED,
    backgroundColor: '#ffe6e6',
  },
});

export default OptionSelect;
