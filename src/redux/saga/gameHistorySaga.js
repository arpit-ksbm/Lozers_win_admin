import * as actionTypes from '../action-types';
import { getAPI } from '../../utils/api-function';
import { call, put, takeLeading } from 'redux-saga/effects';
import { get_fst_game_history, get_ftt_game_history, get_pt_game_history } from '../../utils/api-routes';

function* getFTTGameHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_ftt_game_history);
        console.log("Get FTT Game History Saga Response ::: ", data);

        if (data) {
            yield put({ type: actionTypes.SET_FTT_GAME_HISTORY, payload: data?.games });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get FTT Game History Saga Error ::: ", error?.response?.data);
    }
}

function* getFSTGameHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_fst_game_history);
        console.log("Get FST Game History Saga Response ::: ", data);

        if (data) {
            yield put({ type: actionTypes.SET_FST_GAME_HISTORY, payload: data?.games });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get FST Game History Saga Error ::: ", error?.response?.data);
    }
}

function* getPTGameHistory() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_pt_game_history);
        console.log("Get PT Game History Saga Response ::: ", data);

        if (data) {
            yield put({ type: actionTypes.SET_PT_GAME_HISTORY, payload: data?.games });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log("Get PT Game History Saga Error ::: ", error?.response?.data);
    }
}

export default function* gameHistorySaga() {
    yield takeLeading(actionTypes.GET_FTT_GAME_HISTORY, getFTTGameHistory);
    yield takeLeading(actionTypes.GET_FST_GAME_HISTORY, getFSTGameHistory);
    yield takeLeading(actionTypes.GET_PT_GAME_HISTORY, getPTGameHistory);
}