import { combineReducers } from "redux";
import authReducer from "./authReducer";
import commonReducer from "./commonReducer";
import playerReducer from "./playerReducer";
import contestReducer from "./contestReducer";
import gameHistoryReducer from "./gameHistoryReducer";
import currentGameReducer from "./currentGameReducer";
import paymentReducer from "./paymentReducer";
import settingReducer from "./settingReducer";
import usersReducer from "./usersReducer";
import dashboardReducer from "./dashboardReducer";

const rootReducer = combineReducers({
    commonReducer,
    authReducer,
    playerReducer,
    contestReducer,
    usersReducer,
    gameHistoryReducer,
    currentGameReducer,
    paymentReducer,
    dashboardReducer,
    settingReducer
});

export default rootReducer;