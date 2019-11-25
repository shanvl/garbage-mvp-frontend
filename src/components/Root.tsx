import React, { FunctionComponent, useEffect } from "react";
import "../firebase/firebase";
import AppWithNavigation from "../routes";
import { connect } from "react-redux";
import { pupilsActions } from "../ducks/pupils/actions";
import { RootState } from "../state/reducer";

export type DispatchProps = {
  fetchAllPupils: typeof pupilsActions.fetchAllPupilsRequest;
};

export type Props = DispatchProps;

const Root: FunctionComponent<Props> = ({ fetchAllPupils }) => {
  useEffect(() => {
    fetchAllPupils();
  },        [fetchAllPupils]);

  return <AppWithNavigation />;
};

export default connect<undefined, DispatchProps, undefined, RootState>(null, {
  fetchAllPupils: pupilsActions.fetchAllPupilsRequest,
})(Root);
