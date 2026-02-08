import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    type: '',
    message: '',
    show: false
};

export const AlertMessageReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case REDUX_CONSTANTS.UPDATE_ALERT_MESSAGE:
            return {
                ...state, message: payload.message, type: payload.type, show: true
            };
        case REDUX_CONSTANTS.CLEAR_ALERT_MESSAGE:
            return {
                ...initialState
            };
        default:
            return {
                ...initialState
            };
    }
};