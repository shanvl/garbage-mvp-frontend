import React, { FunctionComponent, useCallback } from "react";
import { View, Text } from "react-native";
import PupilsList from "../components/PupilsList";
import { connect } from "react-redux";
import { pupilsSelector, loadingSelector } from "../ducks/pupils/selectors";
import { pupilsActions } from "../ducks/pupils/actions";
import EStyleSheet from "react-native-extended-stylesheet";
import { Pupil } from "../ducks/pupils/reducer";
import { RootState } from "../state/reducer";
import { NavigationTabProp } from "react-navigation-tabs";
import { Routes } from "../routes";

export type DispatchProps = {
  fetchAllPupils: typeof pupilsActions.fetchAllPupilsRequest;
};

export type OwnProps = {
  navigation: NavigationTabProp;
};

export type StateProps = {
  pupils: Pupil[];
  loading: boolean;
};

export type Props = StateProps & DispatchProps & OwnProps;

const Pupils: FunctionComponent<Props> = ({ pupils, loading, fetchAllPupils, navigation }) => {
  const onListRowPress = useCallback((id: string, name: string) => {
    navigation.navigate(Routes.PUPIL, { id, name });
  },                                 []);

  return (
    <View style={styles.container}>
      {!loading && pupils.length <= 0 && <Text style={styles.notFoundText}>Учеников не найдено</Text>}
      <PupilsList pupils={pupils} loading={loading} onPull={fetchAllPupils} onRowPress={onListRowPress} />
    </View>
  );
};

(Pupils as any).navigationOptions = () => ({
  title: "Ученики",
});

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    color: "$inputText",
    fontSize: 20,
    marginTop: 20,
  },
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    pupils: pupilsSelector(state),
    loading: loadingSelector(state),
  }),
  { fetchAllPupils: pupilsActions.fetchAllPupilsRequest }
)(Pupils);
