import { CATALOG_CONSTANTS } from "../Action/CatalogAction";

const initialState = {
    catalog: {
        CATEGORY: [],
        ACCOUNT: []
    }
};

export const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATALOG_CONSTANTS.SET_CATALOG:
            return {
                ...state,
                catalog: action.payload
            };
        case CATALOG_CONSTANTS.CLEAR_CATALOG:
            return initialState;
        default:
            return state;
    }
};
