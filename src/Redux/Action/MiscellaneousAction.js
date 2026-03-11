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

// Helper function to get auth headers
const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
});

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
