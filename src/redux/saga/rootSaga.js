import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import playerSaga from "./playerSaga";
import gameHistorySaga from './gameHistorySaga';
import currentGameSaga from './currentGameSaga';
import paymentSaga from './paymentSaga';
import settingSaga from './settingSaga';
import contestSaga from "./contestSaga";
import usersSaga from "./userSaga";
import dashboardSaga from "./dashboardSaga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        playerSaga(),
        contestSaga(),
        usersSaga(),
        gameHistorySaga(),
        currentGameSaga(),
        paymentSaga(),
        dashboardSaga(),
        settingSaga()
    ])
};