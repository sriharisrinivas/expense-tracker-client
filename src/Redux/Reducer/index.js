import { combineReducers } from "redux";
import { todosListReducer } from "./todosListReducer";
import { AlertMessageReducer } from "./AlertMessageReducer";
import { loaderReducer } from "./LoaderReducer";
import { SideBarReducer } from "./SideBarReducer";
import { userDetailsReducer } from "./UserDetailsReducer";
import { cashbookReducer } from "./CashbookReducer";
import { darkModeReducer } from "./DarkModeReducer";
import { chatsReducer } from "./ChatReducer";
import { notesReducer } from "./NotesReducer";
import { chatHelperReducer } from "./ChatHelperReducer";
import { groupChatReducer } from "./GroupChatReducer";

export const rootReducer = combineReducers({
    todosListReducer: todosListReducer,
    AlertMessageReducer: AlertMessageReducer,
    loaderReducer: loaderReducer,
    SideBarReducer: SideBarReducer,
    userDetailsReducer: userDetailsReducer,
    cashbookReducer: cashbookReducer,
    darkModeReducer: darkModeReducer,
    chatsReducer: chatsReducer,
    notesReducer: notesReducer,
    groupChatReducer: groupChatReducer,
    chatHelperReducer: chatHelperReducer
})