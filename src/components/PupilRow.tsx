import React, { FunctionComponent } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { Icon } from "react-native-elements";
import EStyleSheet from "react-native-extended-stylesheet";
import Badge from "./Badge";
import { Resources, Resource } from "../ducks/pupils/reducer";

export type OwnProps = {
  badgesOrder: Resource[];
  class: string;
  firstName: string;
  height: number;
  id: string;
  lastName: string;
  onPress: (id: string, name: string) => void;
  resources: Resources;
  children?: never;
};

export type Props = OwnProps;

const PupilRow: FunctionComponent<Props> = ({
  id,
  resources,
  badgesOrder,
  firstName,
  lastName,
  onPress,
  height,
  class: className,
}) => {
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

  let name = `${lastName} ${firstName}`;
  name = name.length >= 25 ? name.slice(0, 22) + "..." : name;

  return (
    <TouchableHighlight onPress={() => onPress(id, name)} underlayColor={styles.$underlayColor}>
      <View style={{ ...styles.container, height }}>
        <View style={styles.classContainer}>
          <Text style={styles.class}>{className}</Text>
        </View>
        <View style={styles.pupilInfo}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.badges}>{renderBadges()}</View>
        </View>
        <View style={styles.arrow}>
          <Icon type="ionicon" name="ios-arrow-forward" size={26} color="#ccc" />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = EStyleSheet.create({
  $underlayColor: "$border",
  arrow: {
    marginLeft: "auto",
  },
  badge: {
    marginRight: 5,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "flex-start",
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

export default React.memo(PupilRow);
