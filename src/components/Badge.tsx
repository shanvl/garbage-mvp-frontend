import React, { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import RESOURCES from "../styles/resources";
import { Resource } from "../ducks/pupils/reducer";

export type OwnProps = {
  amount: number;
  style: EStyleSheet.AnyObject;
  type: Resource;
};

export type Props = OwnProps;

const Badge: FunctionComponent<Props> = ({ type, amount, style }) => {
  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor: RESOURCES[type].color,
      }}
    >
      <Icon {...RESOURCES[type].icon} color={"#FFF"} size={16} />
      <Text style={styles.text}>{amount}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: 23,
    width: 60,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Badge;
