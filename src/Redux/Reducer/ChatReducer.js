import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    conversations: [],
    filteredConversations: [],
    messages: [],
    searchedChats: [],
    filteredSearchedChats: [],
    selectedChatDetails: {},
    onlineUsers: [],
    type: 'Individual' // 'Group'
}   

export const chatsReducer = (state  = initialState, action) => { 
    switch(action.type) {
        case REDUX_CONSTANTS.FETCH_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload
            }
        case REDUX_CONSTANTS.FETCH_FILTERED_CONVERSATIONS:
            return {
                ...state,
                filteredConversations: action.payload
            }
        case REDUX_CONSTANTS.GET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case REDUX_CONSTANTS.UPDATE_SEARCHED_CHATS:
            return {
                ...state,
                searchedChats: action.payload
            }
        case REDUX_CONSTANTS.UPDATE_FILTERED_SEARCHED_CHATS:
            return {
                ...state,
                filteredSearchedChats: action.payload
            }
        case REDUX_CONSTANTS.UPDATE_SELECTED_CHAT_DETAILS:
            return {
                ...state,
                selectedChatDetails: action.payload
            }
        case REDUX_CONSTANTS.UPDATE_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.payload
            }
        case REDUX_CONSTANTS.UPDATE_TYPE:
            return {
                ...state,
                type: action.payload
            }
        case REDUX_CONSTANTS.CLEAR_STATE:
            return initialState
        default:
            return state
    }
 }