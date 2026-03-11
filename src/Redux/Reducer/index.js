import { combineReducers } from "redux";
import { AlertMessageReducer } from "./AlertMessageReducer";
import { loaderReducer } from "./LoaderReducer";
import { SideBarReducer } from "./SideBarReducer";
import { userDetailsReducer } from "./UserDetailsReducer";
import { darkModeReducer } from "./DarkModeReducer";
import { expensesReducer } from "./ExpensesReducer";
import { catalogReducer } from "./CatalogReducer";
import { voiceInputReducer } from "./VoiceInputReducer";

export const rootReducer = combineReducers({
    AlertMessageReducer: AlertMessageReducer,
    loaderReducer: loaderReducer,
    SideBarReducer: SideBarReducer,
    userDetailsReducer: userDetailsReducer,
    darkModeReducer: darkModeReducer,
    expensesReducer: expensesReducer,
    catalogReducer: catalogReducer,
    voiceInputReducer: voiceInputReducer
})