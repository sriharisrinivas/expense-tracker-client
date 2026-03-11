import axios from "axios";
import { API_END_POINTS } from "../../config";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { renderAlertMessageAction, removeRenderAlertMsgAction } from "./AlertMessageAction";

// Helper function to auto-dismiss alerts after 3 seconds
const dispatchAlertWithAutoClose = (dispatch, message, type) => {
    dispatch(renderAlertMessageAction({
        message,
        type,
        show: true
    }));
    
    setTimeout(() => {
        dispatch(removeRenderAlertMsgAction());
    }, 3000);
};

// Action types for catalog
export const CATALOG_CONSTANTS = {
    SET_CATALOG: "SET_CATALOG",
    CLEAR_CATALOG: "CLEAR_CATALOG"
};

// Sync action to set catalog
export const setCatalogAction = (payload) => {
    return {
        type: CATALOG_CONSTANTS.SET_CATALOG,
        payload: payload
    };
};

// Sync action to clear catalog
export const clearCatalogAction = () => {
    return {
        type: CATALOG_CONSTANTS.CLEAR_CATALOG
    };
};

// Helper function to get auth headers
const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
});

// Thunk for fetching catalog
export const fetchCatalogThunk = (types = "CATEGORY,ACCOUNT") => {
    return async (dispatch) => {
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_CATALOG + `?type=${types}`;
            const response = await axios.get(url, {
                headers: getAuthHeaders()
            });
            
            dispatch(setCatalogAction(response.data?.catalog || response.data));
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatchAlertWithAutoClose(dispatch, "Failed to fetch catalog", "error");
            return { success: false, error };
        }
    };
};

// Thunk for clearing catalog
export const clearCatalogThunk = () => {
    return (dispatch) => {
        dispatch(clearCatalogAction());
        return { success: true };
    };
};
