import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import IconRN from "@react-native-vector-icons/material-design-icons";
import { moderateScale } from '../../utils/script';
import { COLORS } from '../../utils/themes';
import { isEmpty } from 'lodash-es';

const Icon = ({
    name,
    size = 24,
    color = COLORS.BLACK,
    containerStyle,
    iconStyle,
    onPress
}) => {
    if(isEmpty(name)) return null;

    size = moderateScale(size);
    const Wrapper = onPress ? TouchableOpacity : View;

    return (
        <Wrapper
            onPress={onPress}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                ...containerStyle
            }}
        >
            <IconRN
                name={name}
                size={size}
                color={color}
                style={iconStyle}
            />
        </Wrapper>
    );
}
 
export default Icon;