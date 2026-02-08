import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    loading: false
};

export const loaderReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case REDUX_CONSTANTS.START_LOADER:
            return { ...state, loading: true };
        case REDUX_CONSTANTS.STOP_LOADER:
            return { ...state, loading: false };
        default:
            return { ...state };
    }
};