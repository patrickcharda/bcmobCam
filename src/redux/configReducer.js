import { SET_BACKURL, SET_URL, UNSET_ZEBRA } from "./actions";

const initialState = { 
    backurl: false,
    url: "",
    zebra: true,
};

const configReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_BACKURL:
            return {
                ...state,
                backurl: !state.backurl,
            };
        case SET_URL:
            return {
                ...state,
                url: action.payload,
            };
        case UNSET_ZEBRA:
            return {
                ...state,
                zebra:!state.zebra,
            };
        default:
            return state;
    }
};

export default configReducer;