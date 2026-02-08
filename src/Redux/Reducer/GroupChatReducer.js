import { selectClasses } from "@mui/material";
import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    groupChats: [],
    filteredGroupChats: [],
    selectedGroupDetails: {}
};

export const groupChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.UPDATE_GROUP_CHATS:
            return {
                ...state,
                groupChats: action.payload,
            };

        case REDUX_CONSTANTS.UPDATE_FILTERED_GROUP_CHATS:
            return {
                ...state,
                filteredGroupChats: action.payload,
            };

        case REDUX_CONSTANTS.UPDATE_SELECTED_GROUP_DETAILS:
            return {
                ...state,
                selectedGroupDetails: action.payload,
            };
        default:
            return state;
    }
}