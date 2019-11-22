import React, { FunctionComponent, ReactElement, useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export type OwnProps = {
  children: ReactElement[];
  onSelect: (index: number) => void;
  selected: number;
  style: EStyleSheet.AnyObject;
};

export type Props = OwnProps;

const Radio: FunctionComponent<Props> = ({ children, selected, onSelect, style }) => {
  const modifyChildren = () =>
    React.Children.map(children, (child, index) => (
      <TouchableWithoutFeedback
        onPress={() => {
          onSelect && onSelect(index);
        }}
      >
        <View>{React.cloneElement(child, { active: selected === index })}</View>
      </TouchableWithoutFeedback>
    ));

  return <View style={style}>{modifyChildren()}</View>;
};

export default Radio;
