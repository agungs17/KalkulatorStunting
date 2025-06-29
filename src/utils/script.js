// file ini di gunakan untuk menampung function global

import { isNumber, isString, isInteger } from "lodash-es";
import { Dimensions, PixelRatio, Platform } from "react-native";

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

export const removeTrailingSlash = (url) => url.replace(/\/+$/, '');

export const updateStateField = (setState, field, value, index = null) => {
  if (index === null) {
    setState(prev => ({
      ...prev,
      [field]: value,
      [`${field}_error`]: '',
    }));
  } else {
    setState(prev => {
      const newState = [...prev];
      const target = { ...newState[index], [field]: value, [`${field}_error`]: '' };
      newState[index] = target;
      return newState;
    });
  }
};

export const resetStateErrors = (prevState) => {
  if (Array.isArray(prevState)) {
    return prevState.map(item => {
      const updatedItem = { ...item };
      Object.keys(updatedItem).forEach(key => {
        if (key.endsWith('_error')) {
          delete updatedItem[key];
        }
      });
      return updatedItem;
    });
  } else {
    const updated = { ...prevState };
    Object.keys(updated).forEach(key => {
      if (key.endsWith('_error')) {
        delete updated[key];
      }
    });
    return updated;
  }
};

export const findArray = (data, filters = {}, callback) => {
  if (!Array.isArray(data)) return [];

  const result = data.filter((item) =>
    Object.entries(filters).every(([key, value]) => item?.[key] === value)
  );

  if (typeof callback === "function") return callback(result);

  return result;
};

export const generateTickArray = (maxValue, length = 6) => {
  if (!maxValue || length <= 1) return [];

  const roundedMax = Math.ceil(maxValue);
  const step = Math.ceil(roundedMax / (length - 1));

  return Array.from({ length }, (_, i) => i * step);
};

export const configLineChart = (data, type) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      type,
      sd: [],
      chartKey : {
        // for chart key refrence from .json
        x : "",
        y : ""
      },
      dataKey : {
        // for data key refrence from api
        x : "",
        y : "",
        zScore : ""
      },
      domain: { x: [0, 0], y: [0, 0] },
      xLine: { title: "", data: [] },
      yLine: { title: "", data: [] },
    };
  }

  let xLineData;
  let yLineData;

  switch (type) {
    case "berat":
      xLineData = generateTickArray( Math.max(...data.map((d) => d.usia_bulan)), 4);
      yLineData = generateTickArray(Math.max(...data.map((d) => d.plus3sd)), 6);

      return {
        type,
        sd: data,
        chartKey : {
          x : "usia_bulan"
        },
        dataKey : {
          x : "age_in_months",
          y : "weight",
          zScore : "z_score_weight"
        },
        domain: {
          x: [0, Math.max(...xLineData)],
          y: [0, Math.max(...yLineData)],
        },
        xLine: {
          title: "Usia (bulan)",
          data: xLineData.filter(num => num !== 0),
        },
        yLine: {
          title: "Berat Badan (kg)",
          data: yLineData,
        },
      };

    case "tinggi":
      xLineData = generateTickArray( Math.max(...data.map((d) => d.usia_bulan)), 4);
      yLineData = generateTickArray(Math.max(...data.map((d) => d.plus3sd)), 6);

      return {
        type,
        sd: data,
        chartKey : {
          x : "usia_bulan"
        },
        dataKey : {
          x : "age_in_months",
          y : "height",
          zScore : "z_score_height"
        },
        domain: {
          x: [0, Math.max(...xLineData)],
          y: [0, Math.max(...yLineData)],
        },
        xLine: {
          title: "Usia (bulan)",
          data: xLineData.filter(num => num !== 0),
        },
        yLine: {
          title: "Tinggi Badan (cm)",
          data: yLineData,
        },
      };

    case "tinggivsberat":
      const xKey = "tinggi"
      yLineData = generateTickArray(Math.max(...data.map((d) => d.plus3sd)), 5);
      const xValues = data.map((d) => d[xKey]);
      const xMin = Math.floor(Math.min(...xValues));
      const xMax = Math.ceil(Math.max(...xValues));

      return {
        type,
        sd: data,
        chartKey : {
          x : xKey
        },
        dataKey : {
          x : "height",
          y : "weight",
          zScore : "z_score_heightvsweight"
        },
        domain: { 
          x: [xMin, xMax],
          y: [0, Math.max(...yLineData)] 
        },
        xLine: {
          title: "Tinggi Badan (cm)",
          data: generateTickArray(Math.max(...data.map((d) => d.tinggi)), 5),
        },
        yLine: {
          title: "Berat Badan (kg)",
          data: generateTickArray(Math.max(...data.map((d) => d.plus3sd)), 5),
        },
      };

    default:
      return {
        type,
        sd: [],
        chartKey : {
          x : "",
          y : ""
        },
        dataKey : {
          x : "",
          y : ""
        },
        domain: { x: [0, 0], y: [0, 0] },
        xLine: { title: "", data: [] },
        yLine: { title: "", data: [] },
      };
  }
};
