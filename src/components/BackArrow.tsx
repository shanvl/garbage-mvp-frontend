import React, { FunctionComponent } from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";

export type OwnProps = {
  onPress: () => void;
  style: EStyleSheet.AnyObject;
  children?: never;
};

export type Props = OwnProps;

const BackArrow: FunctionComponent<Props> = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon name="ios-arrow-back" type="ionicon" color="#9e9e9e" size={31} />
  </TouchableOpacity>
);

export default BackArrow;
