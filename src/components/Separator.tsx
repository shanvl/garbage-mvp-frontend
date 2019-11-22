import React, { FunctionComponent } from "react";
import { StyleSheet } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { View } from "react-native";

export type OwnProps = {
  marginLeft: number;
};

export type Props = OwnProps;

const Separator: FunctionComponent<Props> = ({ marginLeft }) => <View style={{ marginLeft, ...styles.separator }} />;

const styles = EStyleSheet.create({
  separator: {
    backgroundColor: "$border",
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
});

export default Separator;
