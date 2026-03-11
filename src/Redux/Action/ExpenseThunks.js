import axios from "axios";
import { API_END_POINTS } from "../../config";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { renderAlertMessageAction, removeRenderAlertMsgAction } from "./AlertMessageAction";
import { setExpensesAction } from "./ExpenseAction";

// Helper function to auto-dismiss alerts after 3 seconds
const dispatchAlertWithAutoClose = (dispatch, message, type) => {
    dispatch(renderAlertMessageAction({
        message,
        type,
        show: true
    }));
    
    setTimeout(() => {
        dispatch(removeRenderAlertMsgAction());
    }, 3000);
};

// Helper function to get auth headers
const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
});

// Thunk for fetching expenses
export const fetchExpensesThunk = (filterByMonth = null) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_EXPENSES;
            const response = await axios.post(url, { filterByMonth }, {
                headers: getAuthHeaders()
            });
            
            dispatch(setExpensesAction(response.data));
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Failed to fetch expenses", "error");
            return { success: false, error };
        }
    };
};

// Thunk for creating expense
export const createExpenseThunk = (expenseData) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_EXPENSE;
            await axios.post(url, expenseData, {
                headers: getAuthHeaders()
            });
            
            // Fetch updated expenses after creating
            const getUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_EXPENSES;
            const response = await axios.post(getUrl, {}, {
                headers: getAuthHeaders()
            });
            
            dispatch(setExpensesAction(response.data));
            dispatchAlertWithAutoClose(dispatch, "Expense created successfully.", "success");
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Failed to create expense", "error");
            return { success: false, error };
        }
    };
};

// Thunk for updating expense
export const updateExpenseThunk = (expenseData) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_EXPENSE;
            await axios.put(url, expenseData, {
                headers: getAuthHeaders()
            });
            
            // Fetch updated expenses after updating
            const getUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_EXPENSES;
            const response = await axios.post(getUrl, {}, {
                headers: getAuthHeaders()
            });
            
            dispatch(setExpensesAction(response.data));
            dispatchAlertWithAutoClose(dispatch, "Expense updated successfully.", "success");
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Failed to update expense", "error");
            return { success: false, error };
        }
    };
};

// Thunk for deleting expense
export const deleteExpenseThunk = (expenseId) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        
        try {
            const url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.DELETE_EXPENSE;
            await axios.delete(url, {
                data: { expenseId },
                headers: getAuthHeaders()
            });
            
            // Fetch updated expenses after deletion
            const getUrl = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_EXPENSES;
            const response = await axios.post(getUrl, {}, {
                headers: getAuthHeaders()
            });
            
            dispatchAlertWithAutoClose(dispatch, "Expense deleted successfully.", "success");
            dispatch(setExpensesAction(response.data));
            dispatch(stopLoaderAction());
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error);
            dispatch(stopLoaderAction());
            dispatchAlertWithAutoClose(dispatch, "Failed to delete expense", "error");
            return { success: false, error };
        }
    };
};
