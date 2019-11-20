import createAction from "../../state/actions/create-action";
import { PupilsActionTypes } from "./contstants";
import { ActionsUnion } from "../../state/actions/types";
import { Entities } from "../_types";
import { Pupil, Resource } from "./reducer";

export type PupilsAction = ActionsUnion<typeof pupilsActions>;

export type ChangeResourceRequestPayload = {
  id: string;
  type: Resource;
  amount: number;
};

export type ChangeResourceSuccessPayload = ChangeResourceRequestPayload;

export type FetchAllPupilsSuccessPayload = {
  entities: Entities<Pupil>;
};

export type PupilsErrorPayload = {
  error: string;
};

export const pupilsActions = {
  fetchAllPupilsError: (payload: PupilsErrorPayload) => createAction(PupilsActionTypes.FETCH_ALL_PUPILS_ERROR, payload),
  fetchAllPupilsRequest: () => createAction(PupilsActionTypes.FETCH_ALL_PUPILS_REQUEST),
  fetchAllPupilsSuccess: (payload: FetchAllPupilsSuccessPayload) =>
    createAction(PupilsActionTypes.FETCH_ALL_PUPILS_SUCCESS, payload),

  addResourceError: (payload: PupilsErrorPayload) => createAction(PupilsActionTypes.ADD_RESOURCE_ERROR, payload),
  addResourceRequest: (payload: ChangeResourceRequestPayload) =>
    createAction(PupilsActionTypes.ADD_RESOURCE_REQUEST, payload),
  addResourceSuccess: (payload: ChangeResourceSuccessPayload) =>
    createAction(PupilsActionTypes.ADD_RESOURCE_SUCCESS, payload),

  subtractResourceError: (payload: PupilsErrorPayload) =>
    createAction(PupilsActionTypes.SUBTRACT_RESOURCE_ERROR, payload),
  subtractResourceRequest: (payload: ChangeResourceRequestPayload) =>
    createAction(PupilsActionTypes.SUBTRACT_RESOURCE_REQUEST, payload),
  subtractResourceSuccess: (payload: ChangeResourceSuccessPayload) =>
    createAction(PupilsActionTypes.SUBTRACT_RESOURCE_SUCCESS, payload),
};
