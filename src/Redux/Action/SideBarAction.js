import { REDUX_CONSTANTS } from "../reduxConstants";

export const updateContentContainerHeight = payload => {
    return {
        type: REDUX_CONSTANTS.DYNAMIC_CONTENT_CON_HEIGHT,
        payload: payload
    };
};
