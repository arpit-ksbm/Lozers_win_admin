import * as actionTypes from '../action-types';
import { call, delay, put, takeLeading } from 'redux-saga/effects';
import { postAPI } from '../../utils/api-function';
import { current_fst_game_winner_by_admin, current_ftt_game_winner_by_admin, current_pt_game_winner_by_admin, get_current_fst_game_id, get_current_fst_game_timer, get_current_fst_game_total_bets, get_current_ftt_game_id, get_current_ftt_game_timer, get_current_ftt_game_total_bets, get_current_pt_game_id, get_current_pt_game_timer, get_current_pt_game_total_bets } from '../../utils/api-routes';
import Swal from 'sweetalert2';

//* Fun Target Timer
function* getCurrentFTTGameId() {
    try {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: true });

        const { data } = yield postAPI(get_current_ftt_game_id);
        console.log('getCurrentFTTGameId Saga Response ::: ', data);
        if (data) {
            yield put({ type: actionTypes?.SET_CURRENT_FTT_GAME_ID, payload: data })
        }
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });
        console.log("getCurrentFTTGameId Saga Error ::: ", error?.response?.data);
    }
};

function* getCurrentFTTGameTotalBets() {
    try {
        const { data } = yield postAPI(get_current_ftt_game_total_bets);
        console.log('getCurrentFTTGameTotalBets Saga Response ::: ', data);
        if (data) {
            yield put({ type: actionTypes?.SET_CURRENT_FTT_GAME_TOTAL_BETS, payload: data?.currentGame })
        }

    } catch (error) {
        console.log("getCurrentFTTGameTotalBets Saga Error ::: ", error?.response?.data);
    }
};

function* getCurrentFTTGameTimer(action) {
    try {
        const { payload } = action;

        const { data } = yield postAPI(get_current_ftt_game_timer);
        // console.log('getCurrentFTTGameTimer Saga Response ::: ', data);
        if (data) {
            yield put({ type: actionTypes?.SET_CURRENT_FTT_GAME_TIMER, payload: data?.remainingTime })

            if (data?.remainingTime == 10) {
                yield put({ type: actionTypes.GET_CURRENT_FTT_GAME_TOTAL_BETS, payload: null });
            }

            if (data?.remainingTime == 1) {
                yield delay(1000);
                console.log("Saga Run For Get ID After Delay");
                yield put({ type: actionTypes.GET_CURRENT_FTT_GAME_ID, payload: null });
                yield put({ type: actionTypes.GET_CURRENT_FTT_GAME_TOTAL_BETS, payload: null });
                yield call(payload?.onComplete);
            }
        }

    } catch (error) {
        console.log("getCurrentFTTGameTimer Saga Error ::: ", error?.response?.data);
    }
};

function* currentFTTGameWinnerByAdmin(action) {
    try {
        const { payload } = action;

        const { data } = yield postAPI(current_ftt_game_winner_by_admin, payload?.data);
        console.log('currentFTTGameWinnerByAdmin Saga Response ::: ', data);

        if (data) {
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('currentFTTGameWinnerByAdmin Saga Error ::: ', error);
    }
};

//* Fun Sorat Timer
function* getCurrentFSTGameId() {
    try {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: true })

        const { data } = yield postAPI(get_current_fst_game_id);
        console.log('getCurrentFSTGameId Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes?.SET_CURRENT_FST_GAME_ID, payload: data?.data })
        }
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });
        console.log("getCurrentFSTGameId Saga Error ::: ", error?.response?.data);
    }
};

function* getCurrentFSTGameTotalBets() {
    try {
        const { data } = yield postAPI(get_current_fst_game_total_bets);
        console.log('getCurrentFSTGameTotalBets Saga Response ::: ', data);
        if (data) {
            yield put({ type: actionTypes?.SET_CURRENT_FST_GAME_TOTAL_BETS, payload: data?.currentGame })
        }

    } catch (error) {
        console.log("getCurrentFSTGameTotalBets Saga Error ::: ", error?.response?.data);
    }
};

function* getCurrentFSTGameTimer(action) {
    try {
        const { payload } = action;

        const { data } = yield postAPI(get_current_fst_game_timer);
        // console.log('getCurrentFSTGameTimer Saga Response ::: ', data);
        if (data) {
            yield put({ type: actionTypes?.SET_CURRENT_FST_GAME_TIMER, payload: data?.remainingTime })

            if (data?.remainingTime == 10) {
                yield put({ type: actionTypes.GET_CURRENT_FST_GAME_TOTAL_BETS, payload: null });
            }

            if (data?.remainingTime == 1) {
                yield delay(1000);
                console.log("Saga Run For Get ID After Delay");
                yield put({ type: actionTypes.GET_CURRENT_FST_GAME_ID, payload: null });
                yield put({ type: actionTypes.GET_CURRENT_FST_GAME_TOTAL_BETS, payload: null });
                yield call(payload?.onComplete);
            }
        }

    } catch (error) {
        console.log("getCurrentFSTGameTimer Saga Error ::: ", error?.response?.data);
    }
};

function* currentFSTGameWinnerByAdmin(action) {
    try {
        const { payload } = action;

        const { data } = yield postAPI(current_fst_game_winner_by_admin, payload?.data);
        console.log('currentFSTGameWinnerByAdmin Saga Response ::: ', data);

        if (data) {
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('currentFSTGameWinnerByAdmin Saga Error ::: ', error);
    }
};

//* Prologic Timer
function* getCurrentPTGameId() {
    try {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: true })

        const { data } = yield postAPI(get_current_pt_game_id);
        console.log('getCurrentPTGameId Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes?.SET_CURRENT_PT_GAME_ID, payload: data?.data })
        }
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });
        console.log("getCurrentPTGameId Saga Error ::: ", error?.response?.data);
    }
};

function* getCurrentPTGameTotalBets() {
    try {
        const { data } = yield postAPI(get_current_pt_game_total_bets);
        console.log('getCurrentPTGameTotalBets Saga Response ::: ', data);
        if (data) {
            yield put({ type: actionTypes?.SET_CURRENT_PT_GAME_TOTAL_BETS, payload: data?.currentGame })
        }

    } catch (error) {
        console.log("getCurrentPTGameTotalBets Saga Error ::: ", error?.response?.data);
    }
};

function* getCurrentPTGameTimer(action) {
    try {
        const { payload } = action;

        const { data } = yield postAPI(get_current_pt_game_timer);
        // console.log('getCurrentPTGameTimer Saga Response ::: ', data);
        if (data) {
            yield put({ type: actionTypes?.SET_CURRENT_PT_GAME_TIMER, payload: data?.remainingTime })

            if (data?.remainingTime == 10) {
                yield put({ type: actionTypes.GET_CURRENT_PT_GAME_TOTAL_BETS, payload: null });
            }

            if (data?.remainingTime == 1) {
                yield delay(1000);
                console.log("Saga Run For Get ID After Delay");
                yield put({ type: actionTypes.GET_CURRENT_PT_GAME_ID, payload: null });
                yield put({ type: actionTypes.GET_CURRENT_PT_GAME_TOTAL_BETS, payload: null });
                yield call(payload?.onComplete);
            }
        }

    } catch (error) {
        console.log("getCurrentPTGameTimer Saga Error ::: ", error?.response?.data);
    }
};

function* currentPTGameWinnerByAdmin(action) {
    try {
        const { payload } = action;

        const { data } = yield postAPI(current_pt_game_winner_by_admin, payload?.data);
        console.log('currentPTGameWinnerByAdmin Saga Response ::: ', data);

        if (data) {
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('currentPTGameWinnerByAdmin Saga Error ::: ', error);
    }
};

export default function* currentGameSaga() {
    //* Fun Target Timer
    yield takeLeading(actionTypes?.GET_CURRENT_FTT_GAME_ID, getCurrentFTTGameId);
    yield takeLeading(actionTypes?.GET_CURRENT_FTT_GAME_TOTAL_BETS, getCurrentFTTGameTotalBets);
    yield takeLeading(actionTypes?.GET_CURRENT_FTT_GAME_TIMER, getCurrentFTTGameTimer);
    yield takeLeading(actionTypes?.CURRENT_FTT_GAME_WINNER_BY_ADMIN, currentFTTGameWinnerByAdmin);

    //* Fun Sorat Timer
    yield takeLeading(actionTypes?.GET_CURRENT_FST_GAME_ID, getCurrentFSTGameId);
    yield takeLeading(actionTypes?.GET_CURRENT_FST_GAME_TOTAL_BETS, getCurrentFSTGameTotalBets);
    yield takeLeading(actionTypes?.GET_CURRENT_FST_GAME_TIMER, getCurrentFSTGameTimer);
    yield takeLeading(actionTypes?.CURRENT_FST_GAME_WINNER_BY_ADMIN, currentFSTGameWinnerByAdmin);

    //* Prologic Timer
    yield takeLeading(actionTypes?.GET_CURRENT_PT_GAME_ID, getCurrentPTGameId);
    yield takeLeading(actionTypes?.GET_CURRENT_PT_GAME_TOTAL_BETS, getCurrentPTGameTotalBets);
    yield takeLeading(actionTypes?.GET_CURRENT_PT_GAME_TIMER, getCurrentPTGameTimer);
    yield takeLeading(actionTypes?.CURRENT_PT_GAME_WINNER_BY_ADMIN, currentPTGameWinnerByAdmin);
};