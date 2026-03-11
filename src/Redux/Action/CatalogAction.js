import axios from "axios";
import { API_END_POINTS } from "../../config";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { renderAlertMessageAction, removeRenderAlertMsgAction } from "./AlertMessageAction";
import { dispatchAlertWithAutoClose, getAuthHeaders } from "../helpers/reduxHelpers";

// Action types for catalog
export const CATALOG_CONSTANTS = {
    SET_CATALOG: "SET_CATALOG"
};

// Sync action to set catalog
export const setCatalogAction = (payload) => {
    return {
        type: CATALOG_CONSTANTS.SET_CATALOG,
        payload: payload
    };
};

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
