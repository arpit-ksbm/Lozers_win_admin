import Swal from 'sweetalert2';
import * as actionTypes from '../action-types';
import { call, put, takeLeading } from 'redux-saga/effects';
import { postAPI, getAPI, putAPI, deleteAPI } from '../../utils/api-function';
import { get_dashboard, get_users } from '../../utils/api-routes';
import { Color } from '../../assets/color';

function* getDashboard() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(getAPI, get_dashboard);
        console.log('Get Dashboard Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_DASHBOARD, payload: data?.data });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error('Get Users Saga Error ::: ', error?.response?.data || error);
    }
}

export default function* dashboardSaga() {
    yield takeLeading(actionTypes.GET_DASHBOARD, getDashboard);
}