import React from "react";
import Container from "../atoms/Container";
import Text from "../atoms/Text";
import { moderateScale } from "../../utils/script";
import { GLOBAL_STYLES } from "../../utils/themes";
import Icon from "../atoms/Icon";
import { isFunction } from "lodash-es";
import { useNavigation } from "@react-navigation/native";

const Header = ({ 
  title = "Title Header",
  style,
  useBack = false,
  leftComponent,
  centerComponent,
  rightComponent,
}) => {
  const navigation = useNavigation()

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Container
      noFlex
      noEarlyReturn
      usePaddingHorizontal
      style={{
        zIndex : 99,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: moderateScale(18),
        ...GLOBAL_STYLES.SHADOW,
        ...style
      }}
    >
      {leftComponent ? 
          (
            isFunction(leftComponent) ? leftComponent() : leftComponent
          ) 
          : 
          useBack && <Icon name="arrow-left" onPress={handleBackPress}/>
      }
      <Container style={{ paddingLeft: leftComponent || useBack ? moderateScale(10) : 0, paddingRight: rightComponent ? 0 : moderateScale(10) }}>
        {
          centerComponent ? 
            (
              isFunction(centerComponent) ? centerComponent() : centerComponent
            ) 
            : 
            <Text fontWeight="bold" fontSize={18}>{title}</Text>
        }
      </Container>
      {rightComponent && isFunction(rightComponent) ? rightComponent() : rightComponent}
    </Container>
  );
};

export default Header;
