import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import Text from './Text'
import { COLORS } from '../../utils/themes'
import { moderateScale } from '../../utils/script'

const Button = ({
  type = 'solid', // solid || outline
  children,
  containerStyle = {},
  textStyle = {},
  // mini style (simple style)
  disabled = false,
  loading = false,
  btnColor = COLORS.GREEN,
  paddingVertical = 10,
  textColor = COLORS.WHITE,
  borderRadius = 10,
  borderWidth = 1,
  fontSize = 18,
  fontWeight = 'bold',
  onPress = null,
}) => {

 if (!children) return null

  if (loading) disabled = true
  if (disabled) {
    btnColor = '#E2E4E7'
    textColor = '#80838C'
  }

  paddingVertical = moderateScale(paddingVertical)
  borderRadius = moderateScale(borderRadius)

  return (
    <TouchableOpacity disabled={disabled} style={[{ alignSelf : 'center', backgroundColor: type === 'outline' ? disabled ? '#F8F8F8' : 'transparent' : btnColor, borderWidth: type === 'outline' ? borderWidth : 0, borderColor: type === 'outline' ? btnColor : 'transparent', borderRadius: borderRadius, alignItems: 'center', paddingVertical: paddingVertical, ...containerStyle }]} onPress={onPress}>
      {loading ? 
        <ActivityIndicator size='small' color={type === 'outline' ? disabled ? '#A0A0A0' : btnColor : textColor} /> 
        : 
        <Text fontWeight={fontWeight} fontSize={fontSize} textStyle={{ color: type === 'outline' ? disabled ? '#A0A0A0' : btnColor : textColor, fontSize: fontSize, ...textStyle, paddingVertical : 6 }}>{children}</Text>
      }
    </TouchableOpacity>
  )
}

export default Button
