import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import { pupilSelector } from "../ducks/pupils/selectors";
import ResourceCard from "../components/ResourceCard";
import { Resource, Pupil as PupilType } from "../ducks/pupils/reducer";
import { RootState } from "../state/reducer";
import { NavigationTabProp } from "react-navigation-tabs";
import { Routes } from "../routes";

export type OwnProps = {
  navigation: NavigationTabProp;
};

export type StateProps = {
  pupil: PupilType;
};

export type Props = OwnProps & StateProps;

const Pupil: FunctionComponent<Props> = ({ navigation, pupil }) => {
  const addResource = (type: Resource) => () => {
    navigation.navigate(Routes.CHANGE_RESOURCE, {
      type,
      action: "add",
      id: pupil.id,
      amount: pupil.resources[type],
    });
  };

  const subtractResource = (type: Resource) => () => {
    navigation.navigate(Routes.CHANGE_RESOURCE, {
      type,
      action: "subtract",
      id: pupil.id,
      amount: pupil.resources[type],
    });
  };

  const { firstName, lastName, resources, ...rest } = pupil;
  const name = `${lastName} ${firstName}`;
  return (
    <View style={styles.container}>
      <View style={styles.classContainer}>
        <Text style={styles.classText}>{rest.class}</Text>
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.resources}>
        <ResourceCard
          amount={resources.plastic}
          type="plastic"
          onAdd={addResource("plastic")}
          onSubtract={subtractResource("plastic")}
        />
        <ResourceCard
          amount={resources.gadgets}
          type="gadgets"
          onAdd={addResource("gadgets")}
          onSubtract={subtractResource("gadgets")}
        />
        <ResourceCard
          amount={resources.paper}
          type="paper"
          onAdd={addResource("paper")}
          onSubtract={subtractResource("paper")}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  backArrow: {
    paddingHorizontal: 20,
  },
  classContainer: {
    backgroundColor: "$red",
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  classText: {
    color: "#FFF",
    fontSize: 45,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  name: {
    fontSize: 27,
    padding: 10,
    color: "$darkText",
  },
  resources: {
    marginTop: 15,
    width: "85%",
  },
});

export default connect<StateProps, undefined, OwnProps, RootState>((state, ownProps) => ({
  pupil: pupilSelector(state, ownProps),
}))(Pupil);
