import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    dynamicContentContainerHeight: 84

};

export const SideBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.DYNAMIC_CONTENT_CON_HEIGHT:
            return {
                ...state, dynamicContentContainerHeight: action.payload
               };
        default:
            return {
                ...initialState
            };
    }
};