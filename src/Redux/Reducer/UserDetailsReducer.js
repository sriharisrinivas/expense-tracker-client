import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    username: ''
}

export const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.UPDATE_USER_DETAILS:
            return { ...state, ...action.payload}
        default:
            return {...state }

    }
} 