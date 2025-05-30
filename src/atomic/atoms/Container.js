import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale } from "../../utils/script";
import { delay } from "lodash-es";
import { COLORS } from "../../utils/themes";

const Container = ({
  children,
  style,
  center = false,
  noFlex = false,
  useSafeArea = false,
  usePaddingHorizontal = false,
  useEarlyReturn = false,
}) => {
  const [show, setShow] = useState(!useEarlyReturn);

  useEffect(() => {
    if (useEarlyReturn && !show) {
      delay(() => {
        setShow(true);
      }, 0);
    }
  }, [useEarlyReturn]);

  if(!show) return null;
  const Wrapper = useSafeArea ? SafeAreaView : View;
  
  return (
    <Wrapper
      style={{
        flex: noFlex ? 0 : 1,
        justifyContent : center ? 'center' : 'flex-start',
        paddingHorizontal: usePaddingHorizontal ? horizontalScale(15) : 0,
        backgroundColor: COLORS.WHITE,
        ...style,
      }}
    >
      {children}
    </Wrapper>
  );
};

export default Container;
