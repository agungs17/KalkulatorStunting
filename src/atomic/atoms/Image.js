import React from 'react';
import { Image as ImageRN, View, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../utils/script';

const Image = ({
    source,
    containerStyle,
    imageStyle,
    width = 100,
    height = 100,
    resizeMode = 'cover',
    borderRadius = 0,
    onPress,
}) => {
    if (!source) return null;
    
    source = typeof source === 'string' ? { uri: source } : source;
    const Wrapper = onPress ? TouchableOpacity : View;
    width = moderateScale(width);
    height = moderateScale(height);
    borderRadius = moderateScale(borderRadius);

    return (
        <Wrapper
            onPress={onPress}
            style={{
                width,
                height,
                borderRadius,
                ...containerStyle,
            }}
        >
            <ImageRN
                source={source}
                resizeMode={resizeMode}
                style={{
                    width,
                    height,
                    borderRadius,
                    ...imageStyle,
                }}
            />
        </Wrapper>
    );
}
 
export default Image;