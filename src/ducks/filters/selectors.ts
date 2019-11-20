import { createSelector } from "reselect";
import { RootState } from "../../state/reducer";

export const stateSelector = (state: RootState) => state.filters;

export const sortBySelector = createSelector(stateSelector, state => state.sortBy);

export const querySelector = createSelector(stateSelector, state => state.query);
