import Swal from 'sweetalert2';
import * as actionTypes from '../action-types';
import { call, put, takeLeading } from 'redux-saga/effects';
import { postAPI, getAPI } from '../../utils/api-function';
import { change_player_status, create_player, delete_player, get_player, update_player, update_player_wallet } from '../../utils/api-routes';
import { Color } from '../../assets/color';

function* getPlayer() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_player);
        console.log('Get Player Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_PLAYER, payload: data?.results?.reverse() });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Player Saga Error ::: ', error?.response?.data);
    }
};

function* createPlayer(action) {
    try {
        const { payload } = action;
        console.log('Create Player Payload ::: ', payload);

        const { data } = yield postAPI(create_player, payload?.data);
        console.log('Create Player Saga Response ::: ', data);

        if (data?.token) {
            Swal.fire({ icon: "success", title: 'Success', text: "Player created successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('Create Player Saga Error ::: ', error);
    }
};

function* updatePlayer(action) {
    try {
        const { payload } = action;
        console.log('Update Player Payload ::: ', payload);

        const { data } = yield postAPI(update_player, payload?.data);
        console.log('Update Player Saga Response ::: ', data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Player updated successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('Update Player Saga Error ::: ', error?.response?.data);
    }
};

function* deletePlayer(action) {
    try {
        const { payload } = action;
        console.log('Delete Player Payload ::: ', payload);

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(delete_player, payload?.data);
            console.log('Delete Player Saga Response ::: ', data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Player deleted successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes.GET_PLAYER, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log('Delete Player Saga Error ::: ', error?.response?.data);
    }
};

function* updatePlayerWallet(action) {
    const { payload } = action;
    console.log('Update Player Wallet Payload ::: ', payload);
    try {

        const { data } = yield postAPI(update_player_wallet, payload?.data);
        console.log('Update Player Wallet Saga Response ::: ', data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Player wallet updated successfully", showConfirmButton: false, timer: 2000 });
            yield put({ type: actionTypes.GET_PLAYER, payload: null });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        Swal.fire({ icon: "info", title: 'Warning', text: error?.response?.data?.message, showConfirmButton: false, timer: 2000 });
        yield put({ type: actionTypes.GET_PLAYER, payload: null });
        yield call(payload?.onComplete); console.log('Update Player Wallet Saga Error ::: ', error?.response?.data);
    }
};

function* changePlayerStatus(action) {
    try {
        const { payload } = action;
        console.log('Change Player Status Payload ::: ', payload);

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to change status!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield postAPI(change_player_status, payload);
            console.log('Change Player Status Saga Response ::: ', data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Player status updated successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes.GET_PLAYER, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update Status", showConfirmButton: false, timer: 2000 });
        console.log('Change Player Status Saga Error ::: ', error?.response?.data);
    }
};

export default function* playerSaga() {
    yield takeLeading(actionTypes.GET_PLAYER, getPlayer);
    yield takeLeading(actionTypes.CREATE_PLAYER, createPlayer);
    yield takeLeading(actionTypes.UPDATE_PLAYER, updatePlayer);
    yield takeLeading(actionTypes.DELETE_PLAYER, deletePlayer);
    yield takeLeading(actionTypes.UPDATE_PLAYER_WALLET, updatePlayerWallet);
    yield takeLeading(actionTypes.CHANGE_PLAYER_STATUS, changePlayerStatus);
};