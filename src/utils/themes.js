// file ini di gunakan untuk menampung thema global

export const COLORS = {
  WHITE: "#FFFFFF",
  BLACK: "#313339",
  // theme colors
  GREEN: "#15B082",
  SECONDARY_GREEN: "#DEF3ED",
  ORANGE: "#FFA36B",
  SECONDARY_ORANGE: "#FFEFE5",
  BLUE: "#1877F2",
  SECONDARY_BLUE: "#E3F2FD",
  PINK: "#FF4593",
  SECONDARY_PINK: "#FFE8F1",
  RED: "#FF4D4F",
  SECONDARY_RED: "#FFE6E6",
  YELLOW : '#FFFF00',
  SECONDARY_YELLOW: '#FFFFE0'
};

export const GLOBAL_STYLES = {
  SHADOW: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
};

export const infoColors = (category) => {
  switch (category) {
    case "Berat badan sangat kurang":
    case "Sangat pendek":
    case "Sangat kurus":
      return COLORS.RED;

    case "Berat badan kurang":
    case "Pendek":
    case "Kurus":
      return COLORS.ORANGE;

    case "Berat badan normal":
    case "Tinggi normal":
    case "Normal":
      return COLORS.BLUE;

    case "Berat badan lebih":
    case "Tinggi":
    case "Gemuk":
    case "Berisiko gemuk":
      return COLORS.GREEN;

    default:
      return COLORS.GREEN;
  }
}
