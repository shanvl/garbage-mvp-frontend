import { FiltersActionType, SortBy } from "./constants";
import { ActionsUnion } from "../../state/actions/types";
import createAction from "../../state/actions/create-action";

export type FiltersAction = ActionsUnion<typeof filtersActions>;

export type ChangeQueryPayload = {
  query: string;
};

export type ChangeSortingPayload = {
  sortBy: SortBy;
};

export const filtersActions = {
  changeQuery: (payload: ChangeQueryPayload) => createAction(FiltersActionType.CHANGE_QUERY, payload),
  changeSorting: (payload: ChangeSortingPayload) => createAction(FiltersActionType.CHANGE_SORTING, payload),
};
