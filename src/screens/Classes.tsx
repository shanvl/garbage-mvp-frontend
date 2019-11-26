import React, { FunctionComponent, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import { loadingSelector, classesSelector, Class } from "../ducks/pupils/selectors";
import { pupilsActions } from "../ducks/pupils/actions";
import ClassesList from "../components/ClassesList";
import { NavigationTabProp } from "react-navigation-tabs";
import { RootState } from "../state/reducer";

export type DispatchProps = {
  fetchAllPupils: typeof pupilsActions.fetchAllPupilsRequest;
};

export type StateProps = {
  classes: Class[];
  loading: boolean;
};

export type OwnProps = {
  navigation: NavigationTabProp;
};

export type Props = StateProps & DispatchProps & OwnProps;

const Classes: FunctionComponent<Props> = ({ classes, loading, fetchAllPupils }) => {
  return (
    <View style={styles.container}>
      <ClassesList classes={classes} loading={loading} onPull={fetchAllPupils} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

(Classes as any).navigationOptions = () => ({
  title: "Классы",
});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    loading: loadingSelector(state),
    classes: classesSelector(state),
  }),
  { fetchAllPupils: pupilsActions.fetchAllPupilsRequest }
)(Classes);
