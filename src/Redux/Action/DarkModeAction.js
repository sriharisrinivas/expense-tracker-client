import { REDUX_CONSTANTS } from "../reduxConstants";

export const darkModeAction = () => ({
    type: REDUX_CONSTANTS.DARK_MODE
})

export const lightModeAction = () => ({
    type: REDUX_CONSTANTS.LIGHT_MODE
})