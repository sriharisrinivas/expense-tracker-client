import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";

export const createCashbookAction = () => {
    return {
        type: REDUX_CONSTANTS.CREATE_CASHBOOK,
    };
};

export const getCashbookNamesAction = payload => {
    return {
        type: REDUX_CONSTANTS.GET_CASHBOOK_NAMES,
        payload: payload
    };
};

export const getAllEntriesAction = payload => {
    return {
        type: REDUX_CONSTANTS.GET_ALL_ENTRIES,
        payload: payload
    };
};

export const createCashbook = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_CASHBOOK;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        };
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        response = await response.json();
        dispatch(createCashbookAction());
        dispatch(getCashbookNames());
    };
};

export const getCashbookNames = () => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_CASHBOOK_NAMES;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        response = await response.json();
        dispatch(getCashbookNamesAction(response));
    };
};

export const createEntry = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_NEW_ENTRY;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        };
        await fetch(url, options);
        dispatch(stopLoaderAction());
    };
};

export const updateEntry = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_ENTRY;
        let options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        };
        await fetch(url, options);
        dispatch(stopLoaderAction());
    };
};

export const getAllEntries = (payload) => {
    return async function (dispatch) {
        if (payload.id=="") {
            dispatch(getAllEntriesAction([]))
            return
        }
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_CASHBOOK_ENTRIES + payload.id;
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        response = await response.json();
        dispatch(getAllEntriesAction(response));
    };
};

export const deleteEntry = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.DELETE_ENTRY + payload.cbsmId;
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        };
        await fetch(url, options);
        dispatch(stopLoaderAction());
    };
};