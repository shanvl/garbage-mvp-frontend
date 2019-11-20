import produce from "immer";
import { Entities } from "../_types";
import { PupilsAction } from "./actions";
import { PupilsActionTypes } from "./contstants";

export type Pupil = {
  class: string;
  firstName: string;
  id: string;
  lastName: string;
  resources: Resources;
};

export type Class = {
  id: string;
  resources: Resources;
};

export type Resources = {
  gadgets: number;
  paper: number;
  plastic: number;
};

export type Resource = keyof Resources;

export type PupilsState = {
  entities: Entities<Pupil>;
  loading: boolean;
  error?: string;
};

const initialState: PupilsState = {
  loading: false,
  error: undefined,
  entities: {},
};

const reducer = produce((state: PupilsState, action: PupilsAction) => {
  switch (action.type) {
    case PupilsActionTypes.SUBTRACT_RESOURCE_REQUEST:
    case PupilsActionTypes.ADD_RESOURCE_REQUEST:
    case PupilsActionTypes.FETCH_ALL_PUPILS_REQUEST: {
      state.loading = true;
      return;
    }

    case PupilsActionTypes.FETCH_ALL_PUPILS_SUCCESS: {
      state.loading = false;
      state.entities = action.payload.entities;
      return;
    }

    case PupilsActionTypes.SUBTRACT_RESOURCE_SUCCESS:
    case PupilsActionTypes.ADD_RESOURCE_SUCCESS: {
      const { payload } = action;
      state.loading = false;
      state.entities[payload.id].resources[payload.type] = payload.amount;
      return;
    }

    case PupilsActionTypes.SUBTRACT_RESOURCE_ERROR:
    case PupilsActionTypes.ADD_RESOURCE_ERROR:
    case PupilsActionTypes.FETCH_ALL_PUPILS_ERROR: {
      state.loading = false;
      state.error = action.payload.error;
      return;
    }
  }
},                      initialState);

export default reducer;
