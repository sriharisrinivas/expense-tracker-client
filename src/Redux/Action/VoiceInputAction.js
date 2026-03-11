import { REDUX_CONSTANTS } from "../reduxConstants";

export const toggleVoiceInputAction = (isOpen) => {
    return {
        type: REDUX_CONSTANTS.TOGGLE_VOICE_INPUT,
        payload: isOpen
    };
};

export const setVoiceInputTextAction = (text) => {
    return {
        type: REDUX_CONSTANTS.SET_VOICE_INPUT_TEXT,
        payload: text
    };
};

export const clearVoiceInputTextAction = () => {
    return {
        type: REDUX_CONSTANTS.CLEAR_VOICE_INPUT_TEXT
    };
};

export const setParsedExpenseAction = (parsedData) => {
    return {
        type: REDUX_CONSTANTS.SET_PARSED_EXPENSE,
        payload: parsedData
    };
};

export const clearParsedExpenseAction = () => {
    return {
        type: REDUX_CONSTANTS.CLEAR_PARSED_EXPENSE
    };
};
