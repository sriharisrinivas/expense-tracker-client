import axios from "axios";
import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";

export const createExpenseAction = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_EXPENSE;
        axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch({
                type: REDUX_CONSTANTS.CREATE_EXPENSE,
                payload: response.data
            });
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
        dispatch(stopLoaderAction());
    };
};

export const getExpensesAction = () => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_EXPENSES;
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch({
                type: REDUX_CONSTANTS.GET_EXPENSES,
                payload: response.data
            });
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
        dispatch(stopLoaderAction());
    };
};

export const updateExpenseAction = (expenseId, payload) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        let url = `${process.env.REACT_APP_SERVER_URL}${API_END_POINTS.UPDATE_EXPENSE}/${expenseId}`;
        axios.put(url, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch({
                type: REDUX_CONSTANTS.UPDATE_EXPENSE,
                payload: response.data
            });
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
        dispatch(stopLoaderAction());
    };
};

export const deleteExpenseAction = (expenseId) => {
    return async (dispatch) => {
        dispatch(startLoaderAction());
        let url = `${process.env.REACT_APP_SERVER_URL}${API_END_POINTS.DELETE_EXPENSE}/${expenseId}`;
        axios.delete(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((response) => {
            dispatch({
                type: REDUX_CONSTANTS.DELETE_EXPENSE,
                payload: expenseId
            });
        }).catch((error) => {
            dispatch(stopLoaderAction());
            console.log(error);
        });
        dispatch(stopLoaderAction());
    };
}