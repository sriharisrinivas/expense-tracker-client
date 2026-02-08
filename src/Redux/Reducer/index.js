import { combineReducers } from "redux";
import { AlertMessageReducer } from "./AlertMessageReducer";
import { loaderReducer } from "./LoaderReducer";
import { SideBarReducer } from "./SideBarReducer";
import { userDetailsReducer } from "./UserDetailsReducer";
import { darkModeReducer } from "./DarkModeReducer";
import { chatsReducer } from "./ChatReducer";
import { notesReducer } from "./NotesReducer";
import { chatHelperReducer } from "./ChatHelperReducer";

export const rootReducer = combineReducers({
    AlertMessageReducer: AlertMessageReducer,
    loaderReducer: loaderReducer,
    SideBarReducer: SideBarReducer,
    userDetailsReducer: userDetailsReducer,
    darkModeReducer: darkModeReducer,
    chatsReducer: chatsReducer,
    notesReducer: notesReducer,
    chatHelperReducer: chatHelperReducer
})