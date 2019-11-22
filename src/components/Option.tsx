import React, { FunctionComponent } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import { IconProp } from "../screens/Filters";

export type OwnProps = {
  icon: IconProp;
  label: string;
  onPress: () => void;
  selected: boolean;
};

export type Props = OwnProps;

const Option: FunctionComponent<Props> = ({ selected, label, onPress, icon }) => (
  <TouchableHighlight onPress={onPress} underlayColor={styles.$underlayColor}>
    <View style={styles.container}>
      <Icon name={icon.name} containerStyle={styles.icon} color={icon.color} type={icon.type} size={23} />
      <Text style={styles.text}>{label}</Text>
      {selected && (
        <Icon
          containerStyle={styles.checkMark}
          name="ios-checkmark"
          type={"ionicon"}
          color="rgb(0, 122, 255)"
          size={27}
        />
      )}
    </View>
  </TouchableHighlight>
);

const styles = EStyleSheet.create({
  $underlayColor: "$border",
  icon: {
    position: "absolute",
    top: 8,
  },
  text: {
    color: "$darkText",
    fontSize: 17,
    fontWeight: "600",
  },
  container: {
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 20,
  },
  checkMark: {
    marginLeft: "auto",
    top: 1,
  },
});

export default Option;
