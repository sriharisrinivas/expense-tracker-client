import { REDUX_CONSTANTS } from "../reduxConstants";

export const renderAlertMessageAction = payload => {
    return {
        type: REDUX_CONSTANTS.UPDATE_ALERT_MESSAGE,
        payload: payload
    };
};

export const removeRenderAlertMsgAction = payload => {
    return {
        type: REDUX_CONSTANTS.CLEAR_ALERT_MESSAGE,
        payload: payload
    };
};
