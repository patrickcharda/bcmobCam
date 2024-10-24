import { RECORD_SELECTED_BC, PURGE_BC, HEADER_BC_CHANGE_TRUE, HEADER_BC_CHANGE_FALSE } from "./actions";

const initialState = {
  bc: {},
  headerHasChanged: false
};

const bcReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECORD_SELECTED_BC:
      return {
        ...state,
        bc: action.payload,
      };
    case PURGE_BC:
      return {
        ...state,
        bc: {},
        headerHasChanged: false
      };
    case HEADER_BC_CHANGE_TRUE:
      return {
        ...state,
        headerHasChanged: true
      };
    case HEADER_BC_CHANGE_FALSE:
      return {
        ...state,
        headerHasChanged: false
      };
    default:
      return state;
  }
};

export default bcReducer;