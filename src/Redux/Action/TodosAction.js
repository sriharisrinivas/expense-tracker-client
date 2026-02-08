import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import { todosInitialState } from "../Reducer/todosListReducer";
import moment from "moment";

export const fetchTodosOnSuccess = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_TODOS,
        payload: payload
    };
};

export const fetchStatusAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_STATUS_LIST,
        payload: payload
    };
};

export const fetchCategoryAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_CATEGORY_LIST,
        payload: payload
    };
};

export const fetchSeverityAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_SEVERITY_LIST,
        payload: payload
    };
};


export const fetchFilterOptionsAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_SORT_OPTIONS,
        payload: payload
    };
};

export const fetchTransactionTypeAction = payload => {
    return {
        type: REDUX_CONSTANTS.FETCH_TRANSACTION_TYPE_LIST,
        payload: payload
    };
};

/* Old Method fetching status without filters */

// export const fetchTodos = (payload) => {
//     return async function (dispatch) {
//         dispatch(startLoaderAction());
//         let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.FETCH_TODOS;
//         let options = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//                 "Authorization": `Bearer ${sessionStorage.getItem("token")}`
//             },
//         };
//         let response = await fetch(url, options);
//         dispatch(stopLoaderAction());
//         response = await response.json();
//         dispatch(fetchTodosOnSuccess(response));
//     };
// }; 

/* New Method fetching status with filters */

export const fetchTodos = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.FETCH_TODOS;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload ? payload : todosInitialState.searchObj)
        };
        let response = await fetch(url, options);
        dispatch(stopLoaderAction());
        response = await response.json();
        response.forEach(item => item.formattedDueDate = moment(item["dueDate"]).format("DD/MM/YYYY"))
        dispatch(fetchTodosOnSuccess(response));
    };
};

// export const fetchMasters = (payload) => {
//     return async function (dispatch) {
//         dispatch(startLoaderAction());
//         let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.GET_STATUSES + payload.id;
//         let options = {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//                 "Authorization": `Bearer ${sessionStorage.getItem("token")}`
//             },
//         };
//         let response = await fetch(url, options);
//         dispatch(stopLoaderAction());
//         response = await response.json();
//         response.forEach(item => item.selected = true)

//         switch (payload.id) {
//             case 1:
//                 dispatch(fetchSeverityAction(response));
//                 break;
//             case 2:
//                 dispatch(fetchCategoryAction(response));
//                 break;
//             case 3:
//                 dispatch(fetchStatusAction(response));
//                 break;
//             case 4:
//                 dispatch(fetchFilterOptionsAction(response));
//                 break;
//             case 5:
//                 dispatch(fetchTransactionTypeAction(response));
//                 break;
//             default:
//         }

//     };
// }; 