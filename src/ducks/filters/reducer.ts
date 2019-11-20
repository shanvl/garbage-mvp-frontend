import produce from "immer";
import { SortBy, FiltersActionType } from "./constants";
import { FiltersAction } from "./actions";

export type FiltersState = {
  query: string;
  sortBy: SortBy;
};

const initialState = {
  query: "",
  sortBy: SortBy.ALPHA,
};

const reducer = produce((state: FiltersState, action: FiltersAction) => {
  switch (action.type) {
    case FiltersActionType.CHANGE_QUERY: {
      state.query = action.payload.query;
      return;
    }
    case FiltersActionType.CHANGE_SORTING: {
      state.sortBy = action.payload.sortBy;
      return;
    }
  }
},                      initialState);

export default reducer;
