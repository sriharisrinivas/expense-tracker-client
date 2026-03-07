import { REDUX_CONSTANTS } from "../reduxConstants";

// Sync action to set expenses
export const setExpensesAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.GET_EXPENSES,
        payload: payload
    };
};

// Sync action to set a created expense
export const expenseCreatedAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.CREATE_EXPENSE,
        payload: payload
    };
};

// Sync action to set an updated expense
export const expenseUpdatedAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.UPDATE_EXPENSE,
        payload: payload
    };
};

// Sync action to delete an expense
export const expenseDeletedAction = (expenseId) => {
    return {
        type: REDUX_CONSTANTS.DELETE_EXPENSE,
        payload: expenseId
    };
};