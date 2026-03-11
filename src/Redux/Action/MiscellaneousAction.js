import axios from "axios";
import { API_END_POINTS, CONSTANTS } from "../../config";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { renderAlertMessageAction, removeRenderAlertMsgAction } from "./AlertMessageAction";
import { clearVoiceInputTextAction, setParsedExpenseAction, toggleVoiceInputAction } from "./VoiceInputAction";
import { dispatchAlertWithAutoClose, getAuthHeaders } from "../helpers/reduxHelpers";

// Thunk for sending feedback
export const sendFeedbackThunk = (feedbackData) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.SEND_FEEDBACK;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            };
            
            const response = await fetch(url, {
                ...options,
                body: JSON.stringify(feedbackData)
            });
            
            dispatch(stopLoaderAction());
            
            if (response.status === 200) {
                dispatchAlertWithAutoClose(dispatch, "Feedback sent successfully.", "success");
                return { success: true };
            } else {
                const data = await response.json();
                dispatchAlertWithAutoClose(dispatch, data.message || "Failed to send feedback", "error");
                return { success: false };
            }
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Error sending feedback", "error");
            return { success: false, error };
        }
    };
};

// Thunk for clearing database (admin operation)
export const clearDatabaseThunk = () => {
    return async (dispatch) => {
        try {
            const url = process.env.REACT_APP_SERVER_URL + "/clearDB";
            await axios.get(url, {
                headers: getAuthHeaders()
            });
            
            dispatchAlertWithAutoClose(dispatch, "Database cleared successfully.", "success");
            return { success: true };
        } catch (error) {
            console.log(error);
            dispatchAlertWithAutoClose(dispatch, "Failed to clear database", "error");
            return { success: false, error };
        }
    };
};

// Thunk for parsing expense from voice input text
export const parseExpenseFromTextThunk = (text) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.PARSE_EXPENSE;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({ text })
            });
            
            dispatch(stopLoaderAction());
            
            if (response.ok) {
                const parsedData = await response.json();
                dispatch(setParsedExpenseAction(parsedData));
                dispatch(toggleVoiceInputAction(false)); // Close voice input modal
                dispatch(clearVoiceInputTextAction()); // Clear voice input text
                dispatchAlertWithAutoClose(dispatch, "Expense parsed successfully", "success");
                return { success: true, data: parsedData };
            } else {
                const errorData = await response.json();
                dispatchAlertWithAutoClose(dispatch, errorData.message || "Failed to parse expense", "error");
                return { success: false };
            }
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Error parsing expense", "error");
            return { success: false, error };
        }
    };
};
