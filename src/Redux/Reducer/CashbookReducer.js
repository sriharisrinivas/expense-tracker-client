import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    selectedCashbook: '',
    cashbookNames: [],
    cashbookDetails: []
};

export const cashbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.GET_CASHBOOK_NAMES:
            return { ...state, cashbookNames: action.payload };
        case REDUX_CONSTANTS.GET_ALL_ENTRIES:
            return { ...state, cashbookDetails: action.payload };
        default:
            return { ...state };
    }
};