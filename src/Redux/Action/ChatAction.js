import axios from "axios";
import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { renderAlertMessageAction } from "./AlertMessageAction";

const createChatAction = () => {
    return {
        type: REDUX_CONSTANTS.CREATE_CHAT
    };
};
export const fetchConversations = (payload) => {
    return {
        type: REDUX_CONSTANTS.FETCH_CONVERSATIONS,
        payload: payload
    };
};
export const fetchFilteredConversations = (payload) => {
    return {
        type: REDUX_CONSTANTS.FETCH_FILTERED_CONVERSATIONS,
        payload: payload
    };
};

export const updateFilteredChatsAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.UPDATE_FILTERED_CHATS,
        payload: payload
    };
};

export const updateSearchedChatsAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.UPDATE_SEARCHED_CHATS,
        payload: payload
    };
};


export const updateFilteredSearchedChatsAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.UPDATE_FILTERED_SEARCHED_CHATS,
        payload: payload
    };
};

export const updateSelectedChatDetails = (payload) => {
    return {
        type: REDUX_CONSTANTS.UPDATE_SELECTED_CHAT_DETAILS,
        payload: payload
    };
};


export const getMessagesAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.GET_MESSAGES,
        payload: payload
    };
};

export const fetchChats = () => {
    return (dispatch) => {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_CHATS;
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch(stopLoaderAction());
            // dispatch(getChatsAction(response.data));
            dispatch(updateFilteredChatsAction(response.data));
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
    };
};

export const fetchNewUsers = () => {
    return (dispatch) => {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_USERS;
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch(stopLoaderAction());
            dispatch(updateSearchedChatsAction(response.data));
            dispatch(updateFilteredSearchedChatsAction(response.data));
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
    };
};

export const createChat = (payload) => {
    return (dispatch) => {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_CHAT;
        axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch(stopLoaderAction());
            // dispatch(fetchChats());
            dispatch(renderAlertMessageAction({
                message: response.data.message,
                type: "success"
            }));
        }).catch((error) => {
            dispatch(stopLoaderAction());
            setTimeout(() => {
                dispatch(renderAlertMessageAction({
                    message: error.response.data.message,
                    type: "error"
                }));
            }, 100);
        });
    };
};

export const fetchMessages = (chatId) => {
    return (dispatch) => {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_MESSAGES + chatId;
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch(stopLoaderAction());
            dispatch(getMessagesAction(response.data));
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
    };
};


export const createMessage = (payload) => {
    return (dispatch) => {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_MESSAGE;
        axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch(stopLoaderAction());
            dispatch(fetchMessages());
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
    };
};