import { renderAlertMessageAction, removeRenderAlertMsgAction } from "../Action/AlertMessageAction";

// Helper function to auto-dismiss alerts after 3 seconds
export const dispatchAlertWithAutoClose = (dispatch, message, type) => {
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
export const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
});
