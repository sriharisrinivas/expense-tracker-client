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

export const setBudgetItems = () => {
    return {
        type: REDUX_CONSTANTS.SET_BUDGET_ITEMS
    }
}

export const getBudget = (payload) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());


        const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_BUDGET;
        // const result = axios.post(url, payload, { headers: getAuthHeaders() });
        // console.log({result});



        dispatch(stopLoaderAction());
    };
};

export const createBudget = (formData, handleCancel) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());

        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_BUDGET;
            // Uncomment when API is ready
            // const response = await axios.post(url, formData, { headers: getAuthHeaders() });

            handleCancel();
            dispatchAlertWithAutoClose(dispatch, "Budget successfully created.", "success")
            dispatch(getBudget())
        } catch (error) {
            dispatchAlertWithAutoClose(dispatch, error.response?.data?.message || "Error creating budget.", "error");
        } finally {
            dispatch(stopLoaderAction());
        }
    };
};

export const updateBudget = (budgetId, formData, handleCancel) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());

        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_BUDGET;
            // Uncomment when API is ready
            // const response = await axios.put(url + "/" + budgetId, formData, { headers: getAuthHeaders() });

            handleCancel();
            dispatchAlertWithAutoClose(dispatch, "Budget successfully updated.", "success")
            dispatch(getBudget())
        } catch (error) {
            dispatchAlertWithAutoClose(dispatch, error.response?.data?.message || "Error updating budget.", "error");
        } finally {
            dispatch(stopLoaderAction());
        }
    };
};