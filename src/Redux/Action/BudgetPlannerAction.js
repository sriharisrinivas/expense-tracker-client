import axios from "axios";
import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { dispatchAlertWithAutoClose, getAuthHeaders } from "../helpers/reduxHelpers";

export const setBudgetDateAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.SET_BUDGET_DATE,
        payload: payload
    };
};

export const clearBudgetDateAction = () => {
    return {
        type: REDUX_CONSTANTS.CLEAR_BUDGET_DATE
    };
};

export const setBudgetItemsAction = (payload) => {
    return {
        type: REDUX_CONSTANTS.SET_BUDGET_ITEMS,
        payload: payload
    };
};

// Thunk for fetching budgets
export const fetchBudgetsThunk = (filterByMonth = null) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_BUDGETS;
            const response = await axios.post(url, { filterByMonth }, {
                headers: getAuthHeaders()
            });
            
            dispatch(setBudgetItemsAction(response.data.budgets || []));
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, error.response?.data?.message || "Failed to fetch budgets", "error");
            return { success: false, error };
        }
    };
};

// Thunk for creating budget
export const createBudgetThunk = (budgetData, handleCancel) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());

        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_BUDGET;
            await axios.post(url, budgetData, { headers: getAuthHeaders() });

            // Fetch updated budgets after creating
            const getUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_BUDGETS;
            const response = await axios.post(getUrl, { filterByMonth:budgetData.date }, { headers: getAuthHeaders() });
            
            handleCancel(); // Close the create budget form/modal
            dispatch(setBudgetItemsAction(response.data.budgets || []));
            dispatchAlertWithAutoClose(dispatch, "Budget successfully created.", "success");
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, error.response?.data?.message || "Error creating budget.", "error");
            return { success: false, error };
        }
    };
};

// Thunk for updating budget
export const updateBudgetThunk = (budgetData) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());

        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_BUDGET;
            await axios.put(url, budgetData, { headers: getAuthHeaders() });

            // Fetch updated budgets after updating
            const getUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_BUDGETS;
            const response = await axios.post(getUrl, { filterByMonth:budgetData.date }, { headers: getAuthHeaders() });
            
            dispatch(setBudgetItemsAction(response.data.budgets || []));
            dispatchAlertWithAutoClose(dispatch, "Budget successfully updated.", "success");
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, error.response?.data?.message || "Error updating budget.", "error");
            return { success: false, error };
        }
    };
};

// Thunk for deleting budget
export const deleteBudgetThunk = (budgetId) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());

        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.DELETE_BUDGET;
            await axios.delete(url, {
                data: { budgetId },
                headers: getAuthHeaders()
            });

            // Fetch updated budgets after deletion
            const getUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_BUDGETS;
            const response = await axios.post(getUrl, {}, { headers: getAuthHeaders() });
            
            dispatch(setBudgetItemsAction(response.data.budgets || []));
            dispatchAlertWithAutoClose(dispatch, "Budget successfully deleted.", "success");
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, error.response?.data?.message || "Error deleting budget.", "error");
            return { success: false, error };
        }
    };
};