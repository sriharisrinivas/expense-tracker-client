import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    chatTypingDetails: [],
    groupTypingDetails: [],
};

export const chatHelperReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.UPDATE_CHAT_TYPING_DETAILS:
            return {
                ...state,
                chatTypingDetails: action.payload
            };

        case REDUX_CONSTANTS.UPDATE_GROUP_TYPING_DETAILS:
            return {
                ...state,
                groupTypingDetails: action.payload
            };
        default:
            return state;
    }
};