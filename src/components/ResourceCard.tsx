import React, { FunctionComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import RESOURCES from "../styles/resources";
import { Resource } from "../ducks/pupils/reducer";

export type OwnProps = {
  amount: number;
  type: Resource;
  onAdd: () => void;
  onSubtract: () => void;
};

export type Props = OwnProps;

const ResourceCard: FunctionComponent<Props> = ({ type, onAdd, onSubtract, amount }) => {
  const color = RESOURCES[type].color;
  const name = RESOURCES[type].name.toUpperCase();
  return (
    <View style={{ backgroundColor: color, ...styles.container }}>
      <Text style={styles.label}>{name}</Text>
      <TouchableOpacity onPress={onSubtract} style={styles.icon}>
        <Icon type="ionicon" name="ios-remove" size={60} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.amount}>{amount}</Text>
      <TouchableOpacity onPress={onAdd} style={styles.icon}>
        <Icon type="ionicon" name="ios-add" size={60} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  amount: {
    color: "#FFF",
    fontSize: 45,
  },
  container: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    height: 80,
    borderRadius: 9,
    justifyContent: "space-between",
  },
  icon: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  label: {
    position: "absolute",
    padding: 5,
    top: 0,
    left: 0,
    color: "#FFF",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default ResourceCard;
