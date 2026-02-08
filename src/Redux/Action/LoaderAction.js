import { REDUX_CONSTANTS } from "../reduxConstants";

export const startLoaderAction = () => {
    return {
        type: REDUX_CONSTANTS.START_LOADER
    };
};

export const stopLoaderAction = () => {
    return {
        type: REDUX_CONSTANTS.STOP_LOADER
    };
};
