import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    isOpen: false,
    text: "",
    parsedExpense: null
};

export const voiceInputReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REDUX_CONSTANTS.TOGGLE_VOICE_INPUT:
            return { ...state, isOpen: payload };
        case REDUX_CONSTANTS.SET_VOICE_INPUT_TEXT:
            return { ...state, text: payload };
        case REDUX_CONSTANTS.CLEAR_VOICE_INPUT_TEXT:
            return { ...state, text: "" };
        case REDUX_CONSTANTS.SET_PARSED_EXPENSE:
            return { ...state, parsedExpense: payload };
        case REDUX_CONSTANTS.CLEAR_PARSED_EXPENSE:
            return { ...state, parsedExpense: null };
        default:
            return { ...state };
    }
};
