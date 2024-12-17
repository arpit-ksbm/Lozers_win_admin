import * as actionTypes from '../action-types';
import { call, delay, put, takeLeading } from 'redux-saga/effects';
import { postAPI, getAPI } from '../../utils/api-function';
import Swal from 'sweetalert2';
import { approve_reject_payment_request, get_payment_history, get_payment_request } from '../../utils/api-routes';
import { Color } from '../../assets/color';

function* getPaymentRequest() {
    try {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: true });

        const { data } = yield getAPI(get_payment_request);
        console.log('getPaymentRequest Saga Response ::: ', data);

        if (data) {
            yield put({ type: actionTypes?.SET_PAYMENT_REQUEST, payload: data?.data })
        }
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });
        console.log("getPaymentRequest Saga Error ::: ", error?.response?.data);
    }
};

function* getPaymentHistory() {
    try {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: true });

        const { data } = yield getAPI(get_payment_history);
        console.log('getPaymentHistory Saga Response ::: ', data);

        if (data) {
            yield put({ type: actionTypes?.SET_PAYMENT_HISTORY, payload: data?.data })
        }
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes?.SET_IS_LOADING, payload: false });
        console.log("getPaymentHistory Saga Error ::: ", error?.response?.data);
    }
};

function* approveRejectPaymentRequest(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const result = yield Swal.fire({
            title: `Are you sure ?`, text: `You want to change status!!!`,
            icon: "warning", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No"
        });

        if (result.isConfirmed) {
            const { data } = yield postAPI(approve_reject_payment_request, payload);
            console.log("Approve-Reject Payment Request Saga Response ::: ", data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: 'Status has been updated', showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_PAYMENT_REQUEST, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: "Server Error", text: "Failed To Change Status", showConfirmButton: false, timer: 2000, });
        console.log("Approve-Reject Payment Request Saga Error ::: ", error?.response?.data);
    }
}

export default function* paymentSaga() {
    yield takeLeading(actionTypes.GET_PAYMENT_REQUEST, getPaymentRequest);
    yield takeLeading(actionTypes.GET_PAYMENT_HISTORY, getPaymentHistory);
    yield takeLeading(actionTypes.APPROVE_REJECT_PAYMENT_REQUEST, approveRejectPaymentRequest);
};