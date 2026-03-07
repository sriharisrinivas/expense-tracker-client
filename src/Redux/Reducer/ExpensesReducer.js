import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    username: ''
}

export const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.CREATE_EXPENSE:
            return { ...state, ...action.payload}
        case REDUX_CONSTANTS.GET_EXPENSES:
            return { ...state, ...action.payload}
        case REDUX_CONSTANTS.UPDATE_EXPENSE:
            return { ...state, ...action.payload}
        case REDUX_CONSTANTS.DELETE_EXPENSE:
            return { ...state, ...action.payload}
        default:
            return {...state }

    }
} 