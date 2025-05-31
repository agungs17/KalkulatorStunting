// file ini di gunakan untuk menampung function global

import { isNumber, isString, isInteger, isEmpty, isNaN } from "lodash-es";
import { Dimensions, PixelRatio, Platform } from "react-native";
import { TYPE_CHILDS } from "./constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = SCREEN_WIDTH / guidelineBaseWidth;

const scaleVertical = SCREEN_HEIGHT / guidelineBaseHeight;

export const horizontalScale = (size) => {
  if (isNumber(size)) {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
    }
  } else return size;
};

export const verticalScale = (size) => {
  if (isNumber(size)) {
    const newSize = size * scaleVertical;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
    }
  } else return size;
};

export const moderateScale = (size, factor = 0.5) => {
  if (isNumber(size)) {
    if (Platform.OS === "ios") {
      return PixelRatio.roundToNearestPixel(
        size + (horizontalScale(size) - size) * factor
      );
    } else {
      return (
        PixelRatio.roundToNearestPixel(
          size + (horizontalScale(size) - size) * factor
        ) - 1
      );
    }
  } else return size;
};

// percent value to number
export const HeightPercentageToDP = (heightPercent) => {
  if (isInteger(heightPercent)) return heightPercent;
  if (isString(heightPercent)) {
    const elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
  }
  return 0;
};

export const WidthPercentageToDP = (widthPercent) => {
  if (isInteger(widthPercent)) return widthPercent;
  if (isString(widthPercent)) {
    const elemHeight = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemHeight) / 100);
  }
  return 0;
};

export const getTypeChild = (age) => {
  if (age >= 0 && age <= 24) return TYPE_CHILDS[0];
  else return TYPE_CHILDS[1];
};

export const getRoundDownHeight = (num) => {
  const parsed = parseFloat(num.replace(",", "."));
  if (isNaN(parsed)) return 0;
  const result = Math.floor(parsed * 2) / 2;
  return result;
};

const isNegative = (value) => typeof value === "number" && value < 0;

export const generateZScore = (value, data, type = 'BBU') => {
  const median = data.m;
  const v1 = value - median
  const isNeg = isNegative(v1)
  const v2 = isNeg ? median - data.min1SD : data.plus1SD - median;
  const zScore = v1 / v2;
  return {
    zScore,
    category : categorizeZScore(zScore, type), // sesuaikan ke sini
  }
}


function categorizeZScore(z, type) {
  switch (type) {
    case 'BBU': // Berat Badan Umur
      if (z < -3) return 'Berat badan sangat kurang (Gizi Buruk)';
      if (z >= -3 && z < -2) return 'Berat badan kurang (Gizi Kurang)';
      if (z >= -2 && z <= 2) return 'Berat badan normal (Gizi Normal)';
      return 'Berat badan lebih (Gizi Lebih)';

    case 'TBU': // Tinggi Badan Umur
      if (z < -3) return 'Sangat pendek';
      if (z >= -3 && z < -2) return 'Pendek';
      if (z >= -2 && z <= 2) return 'Tinggi normal';
      return 'Tinggi';

    case 'BBTB': // Berat Badan Tinggi Badan
      if (z < -3) return 'Sangat kurus';
      if (z >= -3 && z < -2) return 'Kurus';
      if (z >= -2 && z <= 1) return 'Normal';
      if (z > 1 && z <= 2) return 'Berisiko gemuk';
      return 'Gemuk';

    default:
      return 'Tidak diketahui';
  }
}
