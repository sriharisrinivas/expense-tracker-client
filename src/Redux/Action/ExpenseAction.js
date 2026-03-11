import { REDUX_CONSTANTS } from "../reduxConstants";

// Sync action to set expenses
export const setExpensesAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.GET_EXPENSES,
        payload: payload
    };
};