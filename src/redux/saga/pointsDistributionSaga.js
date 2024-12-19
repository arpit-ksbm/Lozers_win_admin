import Swal from 'sweetalert2';
import * as actionTypes from '../action-types';
import { call, put, takeLeading } from 'redux-saga/effects';
import { postAPI, getAPI, putAPI, deleteAPI } from '../../utils/api-function';
import { get_contest, create_contest, update_contest, delete_contest, get_points } from '../../utils/api-routes';
import { Color } from '../../assets/color';

function* getPoints() {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
        const { data } = yield call(getAPI, get_points);
        console.log('Get Points Saga Response ::: ', data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_POINTS, payload: data?.points });
        }
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    } catch (error) {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
        console.error('Get Contest Saga Error ::: ', error?.response?.data || error);
    }
}

// function* createContest(action) {
//     try {
//         const { payload } = action;
//         console.log('Create Contest Payload ::: ', payload);

//         const { data } = yield call(postAPI, create_contest, payload?.data);
//         console.log('Create Contest Saga Response ::: ', data);

//         if (data?.success) {
//             Swal.fire({
//                 icon: "success",
//                 title: 'Success',
//                 text: "Contest created successfully",
//                 showConfirmButton: false,
//                 timer: 2000,
//             });
//             yield call(payload?.onComplete); // Trigger callback if provided
//         }
//     } catch (error) {
//         console.error('Create Contest Saga Error ::: ', error?.response?.data || error);
//     }
// }

// function* updateContest(action) {
//     try {
//         const { payload } = action;
//         console.log('Update Contest Saga Action Payload:', payload);

//         const { _id, data } = payload;
//         console.log('Update Contest ID:', _id);
//         console.log('Update Contest Data:', data);

//         const { data: response } = yield call(putAPI, `api/admin/edit_contest/${_id}`, data);
//         console.log('Update Contest API Response:', response);

//         if (response?.success) {
//             Swal.fire({
//                 icon: "success",
//                 title: 'Success',
//                 text: "Contest updated successfully",
//                 showConfirmButton: false,
//                 timer: 2000,
//             });
//             yield call(payload?.onComplete); // Trigger onComplete callback if provided
//         }
//     } catch (error) {
//         console.error('Update Contest Saga Error :::', error?.response?.data || error);
//         Swal.fire({
//             icon: "error",
//             title: 'Failed',
//             text: "Failed to update contest",
//             showConfirmButton: false,
//             timer: 2000,
//         });
//     }
// }



// function* deleteContest(action) {
//     try {
//         const { payload } = action; // payload is expected to contain the ID
//         console.log('Delete Contest Payload ::: ', payload);

//         const contestId = typeof payload === 'object' ? payload.id || payload._id : payload;

//         const result = yield Swal.fire({
//             icon: "warning",
//             title: "Are you sure?",
//             text: "You want to delete this contest!",
//             showCancelButton: true,
//             confirmButtonColor: Color.primary,
//             cancelButtonColor: 'grey',
//             confirmButtonText: "Yes",
//             cancelButtonText: "No",
//         });

//         if (result.isConfirmed) {
//             const { data } = yield call(deleteAPI, `${delete_contest}/${contestId}`);
//             console.log('Delete Contest Saga Response ::: ', data);

//             if (data?.success) {
//                 Swal.fire({
//                     icon: "success",
//                     title: 'Success',
//                     text: "Contest deleted successfully",
//                     showConfirmButton: false,
//                     timer: 2000,
//                 });
//                 yield put({ type: actionTypes.GET_CONTEST }); // Refresh contest list
//             }
//         }
//     } catch (error) {
//         Swal.fire({
//             icon: "error",
//             title: 'Failed',
//             text: "Failed to delete contest",
//             showConfirmButton: false,
//             timer: 2000,
//         });
//         console.error('Delete Contest Saga Error ::: ', error?.response?.data || error);
//     }
// }


export default function* pointsSaga() {
    yield takeLeading(actionTypes.GET_POINTS, getPoints);
    // yield takeLeading(actionTypes.CREATE_CONTEST, createContest);
    // yield takeLeading(actionTypes.UPDATE_CONTEST, updateContest);
    // yield takeLeading(actionTypes.DELETE_CONTEST, deleteContest);
}