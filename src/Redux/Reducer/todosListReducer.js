import { REDUX_CONSTANTS } from "../reduxConstants";

export const todosInitialState = {
    todosList: [],
    categoriesList: [
        {
            "DT_CODE": "1",
            "DT_DESCRIPTION": "Personal",
            "selected": true
        },
        {
            "DT_CODE": "2",
            "DT_DESCRIPTION": "Work",
            "selected": true
        }
    ],
    statusList: [
        {
            "DT_CODE": "1",
            "DT_DESCRIPTION": "New",
            "selected": true
        },
        {
            "DT_CODE": "2",
            "DT_DESCRIPTION": "Completed",
            "selected": true
        },
        {
            "DT_CODE": "3",
            "DT_DESCRIPTION": "Deleted",
            "selected": true
        }
    ],
    severityList: [
        {
            "DT_CODE": "1",
            "DT_DESCRIPTION": "Low"
        },
        {
            "DT_CODE": "2",
            "DT_DESCRIPTION": "Medium"
        },
        {
            "DT_CODE": "3",
            "DT_DESCRIPTION": "High"
        }
    ],
    sortoptions: [
        {
            "DT_CODE": "ASC",
            "DT_DESCRIPTION": "Low-to-High"
        },
        {
            "DT_CODE": "DESC",
            "DT_DESCRIPTION": "High-to-Low"
        }
    ],
    transactionTypeList: [],
    searchObj: {
        "sortBySeverity": "DESC",
        "status": "New,Completed,Deleted",
        "search": '',
        "category": 'Personal,Work',
        "fromDate": '2024-01-01T12:00:00.000Z',
        // "toDate": new Date(new Date().setHours(23, 59, 59, 999)),
        "toDate": new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        "sortByDate": "DESC"
    }
};

export const todosListReducer = (state = todosInitialState, action) => {
    switch (action.type) {
        case REDUX_CONSTANTS.FETCH_TODOS:
            return { ...state, todosList: action.payload };
        case REDUX_CONSTANTS.FETCH_CATEGORY_LIST:
            return { ...state, categoriesList: action.payload };
        case REDUX_CONSTANTS.FETCH_STATUS_LIST:
            return { ...state, statusList: action.payload };
        case REDUX_CONSTANTS.FETCH_SEVERITY_LIST:
            return { ...state, severityList: action.payload };
        case REDUX_CONSTANTS.FETCH_SORT_OPTIONS:
            return { ...state, sortoptions: action.payload };
        case REDUX_CONSTANTS.FETCH_TRANSACTION_TYPE_LIST:
            return { ...state, transactionTypeList: action.payload };
        case REDUX_CONSTANTS.UPDATE_FILTER_OBJ:
            return { ...state, searchObj: action.payload };
        case REDUX_CONSTANTS.CLEAR_FILTERS:
            return {...state, searchObj: todosInitialState.searchObj }
        default:
            return { ...state };
    }
};