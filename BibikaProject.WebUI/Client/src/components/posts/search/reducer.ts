import { SearchAction, SearchActionTypes, SearchState } from "./types";

const initialState: SearchState = {
  searchRespond: {
    allPages: 0,
    currentPage: 0,
    data: [],
  },
};

export const searchReducer = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case SearchActionTypes.SET_CAR_RESULT: {
      return {
        ...state,
        searchRespond: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
