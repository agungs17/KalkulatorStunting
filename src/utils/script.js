// file ini di gunakan untuk menampung function global

import { isNumber, isString, isInteger } from 'lodash-es'
import { Dimensions, PixelRatio, Platform } from 'react-native'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window')

const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const scale = SCREEN_WIDTH / guidelineBaseWidth

const scaleVertical = SCREEN_HEIGHT / guidelineBaseHeight

export const horizontalScale = (size) => {
  if (isNumber(size)) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
    }
  } else return size
}

export const verticalScale = (size) => {
  if (isNumber(size)) {
    const newSize = size * scaleVertical
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
    }
  } else return size
}

export const moderateScale = (size, factor = 0.5) => {
  if (isNumber(size)) {
    if (Platform.OS === 'ios') {
      return PixelRatio.roundToNearestPixel(size + (horizontalScale(size) - size) * factor)
    } else {
      return PixelRatio.roundToNearestPixel(size + (horizontalScale(size) - size) * factor) - 1
    }
  } else return size
}

// percent value to number
export const HeightPercentageToDP = heightPercent => {
  if (isInteger(heightPercent)) return heightPercent
  if (isString(heightPercent)) {
    const elemHeight = parseFloat(heightPercent)
    return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100)
  }
  return 0
}

export const WidthPercentageToDP = widthPercent => {
  if (isInteger(widthPercent)) return widthPercent
  if (isString(widthPercent)) {
    const elemHeight = parseFloat(widthPercent)
    return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemHeight) / 100)
  }
  return 0
}
