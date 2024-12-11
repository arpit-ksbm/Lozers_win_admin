import Swal from 'sweetalert2';
import * as actionTypes from '../action-types';
import { call, put, takeLeading } from 'redux-saga/effects';
import { postAPI, getAPI, putAPI, deleteAPI } from '../../utils/api-function';
import { get_users } from '../../utils/api-routes';
import { Color } from '../../assets/color';

function* getUsers() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(getAPI, get_users);
        console.log('Get Users Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_USERS, payload: data?.users });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error('Get Users Saga Error ::: ', error?.response?.data || error);
    }
}

function* updateUserStatus(action) {
    try {
        const { payload } = action;
        const { _id, data } = payload;  // Destructure to get _id and data

        console.log('Update User ID:', _id); // This should be your user ID
        console.log('Update User Data:', data); // This should contain the status

        // If either _id or data is undefined, the API URL will be malformed
        if (!_id || !data?.status) {
            console.error('Invalid payload:', payload);
            return;
        }

        const { data: response } = yield call(putAPI, `api/admin/update_user_status/${_id}`, data);
        console.log('Update User API Response:', response);

        if (response?.success) {
            yield call(payload?.onComplete); // Trigger onComplete callback if provided
        }
    } catch (error) {
        console.error('Update User Saga Error :::', error?.response?.data || error);
    }
}


export default function* usersSaga() {
    yield takeLeading(actionTypes.GET_USERS, getUsers);
    yield takeLeading(actionTypes.UPDATE_USER_STATUS, updateUserStatus);
}