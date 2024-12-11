import Swal from 'sweetalert2';
import * as actionTypes from '../action-types';
import { call, put, takeLeading } from 'redux-saga/effects';
import { postAPI, getAPI, putAPI, deleteAPI } from '../../utils/api-function';
import { change_admin_password, create_sub_admin, delete_sub_admin, get_sub_admin, set_Profit, update_sub_admin } from '../../utils/api-routes';
import { Color } from '../../assets/color';

//! Sub admin
function* getSubadmin() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield getAPI(get_sub_admin);
        console.log('Get Subadmin Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_SUB_ADMIN, payload: data?.results });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    }
    catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.log('Get Subadmin Saga Error ::: ', error?.response?.data);
    }
};


function* createSubadmin(action) {
    try {
        const { payload } = action;
        console.log('Create Subadmin Payload ::: ', payload);

        const { data } = yield postAPI(create_sub_admin, payload?.data);
        console.log('Create Subadmin Saga Response ::: ', data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Subadmin created successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('Create Subadmin Saga Error ::: ', error);
    }
};

function* updateSubadmin(action) {
    try {
        const { payload } = action;
        console.log('Update Subadmin Payload ::: ', payload);

        const { data } = yield putAPI(update_sub_admin(payload?.id), payload?.data);
        console.log('Update Subadmin Saga Response ::: ', data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Subadmin updated successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('Update Subadmin Saga Error ::: ', error?.response?.data);
    }
};

function* deleteSubadmin(action) {
    try {
        const { payload } = action;
        console.log('Delete Subadmin Payload ::: ', payload);

        const result = yield Swal.fire({ icon: "warning", title: `Are you sure ?`, text: "You want to delete!!!", showCancelButton: true, confirmButtonColor: Color.primary, cancelButtonColor: 'grey', confirmButtonText: "Yes", cancelButtonText: "No" });

        if (result.isConfirmed) {
            const { data } = yield deleteAPI(delete_sub_admin(payload));
            console.log('Delete Subadmin Saga Response ::: ', data);

            if (data?.success) {
                Swal.fire({ icon: "success", title: 'Success', text: "Subadmin deleted successfully", showConfirmButton: false, timer: 2000 });
                yield put({ type: actionTypes.GET_SUB_ADMIN, payload: null });
            }
        }

    } catch (error) {
        Swal.fire({ icon: "error", title: 'Failed', text: "Failed To Delete", showConfirmButton: false, timer: 2000 });
        console.log('Delete Subadmin Saga Error ::: ', error?.response?.data);
    }
};

//! Admin
function* changeAdminPassword(action) {
    try {
        const { payload } = action;
        console.log('Change Admin Password Payload ::: ', payload);

        const { data } = yield postAPI(change_admin_password, payload?.data);
        console.log('Change Admin Password Saga Response ::: ', data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Password changed successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('Change Admin Password Saga Error ::: ', error?.response?.data);
    }
};

//! Setting
function* setProfit(action) {
    try {
        const { payload } = action;
        console.log('Set Profit Password Payload ::: ', payload);

        const { data } = yield postAPI(set_Profit, payload?.data);
        console.log('Set Profit Password Saga Response ::: ', data);

        if (data?.success) {
            Swal.fire({ icon: "success", title: 'Success', text: "Changed successfully", showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
        }

    } catch (error) {
        console.log('Set Profit Password Saga Error ::: ', error?.response?.data);
    }
};

export default function* subAdminSaga() {
    yield takeLeading(actionTypes.GET_SUB_ADMIN, getSubadmin);
    yield takeLeading(actionTypes.CREATE_SUB_ADMIN, createSubadmin);
    yield takeLeading(actionTypes.UPDATE_SUB_ADMIN, updateSubadmin);
    yield takeLeading(actionTypes.DELETE_SUB_ADMIN, deleteSubadmin);
    yield takeLeading(actionTypes.CHANGE_ADMIN_PASSWORD, changeAdminPassword);
    yield takeLeading(actionTypes.SET_PROFIT, setProfit);
};