import { REDUX_CONSTANTS } from "../reduxConstants";

const initialState = {
    notesList: [],
    selectedNotesDetails: {
        id: '',
        title: 'Select Notes'
    },
    fetchedEditorDetails: {}
}

export const notesReducer = (state  = initialState, action ) => { 

    switch(action.type) {
        case REDUX_CONSTANTS.UPDATE_SELECTED_NOTES:
            return {
                ...state,
                selectedNotesDetails: action.payload
            }
        case REDUX_CONSTANTS.FETCH_NOTES_LIST:
            return {
                ...state,
                notesList: action.payload
            }
        default:
            return state
    }
 }