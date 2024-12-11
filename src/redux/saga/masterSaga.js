import Swal from 'sweetalert2';
import { Color } from '../../assets/color';
import * as actionTypes from "../action-types";
import { put, call, takeLeading } from 'redux-saga/effects';
import { getAPI, postAPI, patchAPI, deleteAPI } from '../../utils/api-function';
import { create_sale_area, delete_sale_area, get_sale_area, update_sale_area } from '../../utils/api-routes';

//! Sale Area 
function* getSaleArea() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_sale_area);
        console.log("Get SaleArea Saga Response ::: ", data);

        if (data?.status) {
            yield put({ type: actionTypes.SET_SALE_AREA, payload: data?.result });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });

    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        // Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.statusText ? error?.response?.statusText : "Failed To Get Data", showConfirmButton: false, timer: 2000 });
        console.log("Get SaleArea Saga Error ::: ", error);
    }
}

function* createSaleArea(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield postAPI(create_sale_area, payload?.data);
        console.log("Create SaleArea Saga Response ::: ", data);

        if (data?.status) {
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.GET_SALE_AREA, payload: null });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: error?.response?.data?.message, showConfirmButton: false, timer: 10000 });
        console.log("Create SaleArea Saga Error ::: ", error);
    }
}

function* updateSaleArea(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const { data } = yield patchAPI(update_sale_area((payload?.id)), payload?.data);
        console.log("Update SaleArea Saga Response ::: ", data);

        if (data?.status) {
            Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.GET_SALE_AREA, payload: null });
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Update", showConfirmButton: false, timer: 2000 });
        console.log("Update SaleArea Saga Error ::: ", error);
    }
}

function* deleteSaleArea(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload);

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete?", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: Color.red, confirmButtonText: "Delete", })
        if (result.isConfirmed) {
            const { data } = yield deleteAPI(delete_sale_area(payload?.id));
            console.log("Delete SaleArea Saga Response ::: ", data);

            if (data?.status) {
                Swal.fire({ icon: "success", title: 'Success', text: data?.message, showConfirmButton: false, timer: 2000, });
                yield put({ type: actionTypes.GET_SALE_AREA, payload: null });
            }
        }
    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete Data", showConfirmButton: false, timer: 2000 });
        console.log("Delete SaleArea Saga Error ::: ", error);
    }
}

export default function* masterSaga() {
    //? Sale Area
    yield takeLeading(actionTypes?.GET_SALE_AREA, getSaleArea);
    yield takeLeading(actionTypes?.CREATE_SALE_AREA, createSaleArea);
    yield takeLeading(actionTypes?.UPDATE_SALE_AREA, updateSaleArea);
    yield takeLeading(actionTypes?.DELETE_SALE_AREA, deleteSaleArea);
}