import React, { ReactText, FunctionComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export type OwnProps = {
  children: ReactText;
  onPress: () => void;
  style: EStyleSheet.AnyObject;
};

export type Props = OwnProps;

const HollowButton: FunctionComponent<Props> = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.container, ...style }}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: "$blue",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default HollowButton;
