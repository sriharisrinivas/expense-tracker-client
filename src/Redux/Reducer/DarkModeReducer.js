import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    isDarkMode: false
}

export const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.DARK_MODE:
            return { ...state, isDarkMode: true }
        case REDUX_CONSTANTS.LIGHT_MODE:
            return { ...state,  isDarkMode: false }
        default: return state
    }
}