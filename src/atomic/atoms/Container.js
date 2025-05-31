import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View, SafeAreaView } from "react-native";
import { horizontalScale } from "../../utils/script";
import { delay } from "lodash-es";
import { COLORS } from "../../utils/themes";

// jika useKeyboardAvoidingView, props center tidak berfungsi gunakan style paddingTop
const Container = ({
  children,
  style,
  center = false,
  noFlex = false,
  useSafeArea = false,
  usePaddingHorizontal = false,
  useEarlyReturn = false,
  useKeyboardAvoidingView = false,
}) => {
  const [show, setShow] = useState(!useEarlyReturn);

  useEffect(() => {
    if (useEarlyReturn && !show) {
      delay(() => {
        setShow(true);
      }, 0);
    }
  }, [useEarlyReturn]);

  const propsStyle = {
    flex: noFlex ? 0 : 1,
    justifyContent: center ? "center" : "flex-start",
    paddingHorizontal: usePaddingHorizontal ? horizontalScale(20) : 0,
    backgroundColor: COLORS.WHITE,
    ...style,
  };

  if (!show) return null;
  const Wrapper = useSafeArea ? SafeAreaView : View;

  if (useKeyboardAvoidingView) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: noFlex ? 0 : 1 }}
      >
        <ScrollView keyboardShouldPersistTaps='handled'>
          <Wrapper style={propsStyle}>
            {children}
          </Wrapper>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return <Wrapper style={propsStyle}>{children}</Wrapper>;
};

export default Container;