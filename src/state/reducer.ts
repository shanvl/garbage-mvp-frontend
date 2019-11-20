import { combineReducers } from "redux";
import pupils, { PupilsState } from "../ducks/pupils/reducer";
import filters, { FiltersState } from "../ducks/filters/reducer";

export interface RootState {
  pupils: PupilsState;
  filters: FiltersState;
}

const reducer = combineReducers<RootState>({ pupils, filters });

export default reducer;
