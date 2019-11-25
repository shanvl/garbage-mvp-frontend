import React, { FunctionComponent } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Badge from "./Badge";
import { Resource, Resources } from "../ducks/pupils/reducer";

export type OwnProps = {
  badgesOrder: Resource[];
  id: string;
  height: number;
  resources: Resources;
  children?: never;
};

export type Props = OwnProps;

const ClassRow: FunctionComponent<Props> = ({ id, height, badgesOrder, resources }) => {
  const renderBadges = () => {
    const badges: JSX.Element[] = [];
    Object.entries(resources).map(([type, amount]) => {
      const badge = <Badge type={type as Resource} amount={amount} key={type} style={styles.badge} />;
      if (badgesOrder) {
        badges[badgesOrder.indexOf(type as Resource)] = badge;
      } else {
        badges.push(badge);
      }
    });
    return badges;
  };

  return (
    <View style={{ ...styles.container, height }}>
      <View style={styles.classContainer}>
        <Text style={styles.class}>{id}</Text>
      </View>
      <View style={styles.pupilInfo}>
        <View style={styles.badges}>{renderBadges()}</View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  $underlayColor: "$border",
  badge: {
    marginRight: 5,
  },
  badges: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  classContainer: {
    backgroundColor: "$red",
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  class: {
    color: "#FFF",
    fontSize: 22,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 19,
    color: "$darkText",
  },
  pupilInfo: {
    height: "100%",
    marginLeft: 10,
    justifyContent: "space-evenly",
  },
});

export default React.memo(ClassRow);
