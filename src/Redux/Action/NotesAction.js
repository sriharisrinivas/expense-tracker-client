import { API_END_POINTS } from "../../config";
import { REDUX_CONSTANTS } from "../reduxConstants";
import { startLoaderAction, stopLoaderAction } from "./LoaderAction";
import axios from "axios";

// Handling Change
export const updateSelectedNotes = (payload) => {
    return {
        type: REDUX_CONSTANTS.UPDATE_SELECTED_NOTES,
        payload: payload
    };
};

// Updating notes list in store
const updateNotesList = (payload) => {
    return {
        type: REDUX_CONSTANTS.FETCH_NOTES_LIST,
        payload: payload
    };
};

export const createNotes = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction());

        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), 5000);

        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.CREATE_NOTES;
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(payload),
            signal: signal
        };
        await fetch(url, options).then((response) => {
            dispatch(fetchNotes());
        }).catch((error) => {
            console.error('Error:', error);
        });

        dispatch(stopLoaderAction());
    };
};

export const updateNotes = (payload) => {
    return async function (dispatch) {
        dispatch(startLoaderAction()); // Dispatch action to start loader
        
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.UPDATE_NOTES + payload.id;
        
        const source = axios.CancelToken.source(); // Create cancel token source

        try {
            await axios.post(
                url,
                payload,
                {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    cancelToken: source.token, // Pass cancel token to cancel request if needed
                    timeout: 5000 // Timeout after 5 seconds
                }
            );

            dispatch(fetchNotes());
            
            
            // Dispatch any success actions if needed
            
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request cancelled', error.message); // Log if request was cancelled
            } else {
                console.error('Error:', error); // Log other errors
                // Dispatch error handling actions, e.g., show error message to user
            }
        } finally {
            dispatch(stopLoaderAction()); // Dispatch action to stop loader regardless of success or failure
        }
    };
};

export const fetchNotes = () => {
    return async function (dispatch) {
        dispatch(startLoaderAction());
        let url = process.env.REACT_APP_SERVER_URL + API_END_POINTS.FETCH_NOTES_LIST;
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
        dispatch(updateNotesList(response));
    };
};
