import React from 'react';
import Container from './Container';
import Text from './Text';
import { COLORS } from '../../utils/themes';

const InfoBox = ({
    title,
    containerStyle,
    textStyle,
    borderRadius = 5,
    color = COLORS.GREEN,
}) => {
    return (
        <Container style={{ backgroundColor : color, paddingHorizontal : 10, paddingVertical : 5, borderRadius, ...containerStyle }}>
            <Text style={textStyle}>{title}</Text>
        </Container>
    );
}
 
export default InfoBox;