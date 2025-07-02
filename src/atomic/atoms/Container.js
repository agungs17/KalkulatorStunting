import React, { Fragment, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View, SafeAreaView, RefreshControl } from "react-native";
import { horizontalScale } from "../../utils/script";
import { delay } from "lodash-es";
import { COLORS } from "../../utils/themes";
import { isFunction } from 'lodash-es'

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
  useScrollView = false,
  refreshing = false,
  onRefresh
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
  const Container = useScrollView ? ScrollView : Fragment
  const handleRefreshControl = isFunction(onRefresh) ? { refreshControl : <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> } : {}
  const propsContainer = useScrollView ? { showsVerticalScrollIndicator : false, showsHorizontalScrollIndicator : false, ...handleRefreshControl } : {}
  const Wrapper = useSafeArea ? SafeAreaView : View;

  if (useKeyboardAvoidingView && useScrollView) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: noFlex ? 0 : 1 }}
      >
        <Container keyboardShouldPersistTaps='handled' {...propsContainer}>
          <Wrapper style={propsStyle}>
            {children}
          </Wrapper>
        </Container>
      </KeyboardAvoidingView>
    );
  }

  return <Container {...propsContainer}><Wrapper style={propsStyle}>{children}</Wrapper></Container>;
};

export default Container;