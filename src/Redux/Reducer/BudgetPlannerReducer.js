import dayjs from "dayjs";
import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    selectedDate: dayjs(new Date()),
    budgetItems: [
        {
            id: 1,
            limit: 500,
            spent: 100,
            category: "Food",
        }
    ]
};

export const budgetPlannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.SET_BUDGET_DATE:
            return { ...state, selectedDate: action.payload };
        case REDUX_CONSTANTS.CLEAR_BUDGET_DATE:
            return { ...state, selectedDate: dayjs(new Date()) };
        case REDUX_CONSTANTS.SET_BUDGET_ITEMS:
            return { ...state, budgetItems: action.payload}
        default:
            return state;
    }
};
