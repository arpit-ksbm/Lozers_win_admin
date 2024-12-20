import axios from 'axios';
import Swal from 'sweetalert2';
import * as actionTypes from "../action-types";
import { api_urls } from '../../utils/api-urls';
import { admin_login, get_admin_detail } from '../../utils/api-routes';
import { put, call, takeLeading } from 'redux-saga/effects';
import { access_token, refresh_token } from '../../utils/constant';
import { postAPI } from '../../utils/api-function';

// import { access_token } from '../../utils/constant';

function* adminLogin(action) {
    try {
        var { payload } = action;

        const { data } = yield axios.post(`http://localhost:4012/api/admin/admin_login`, payload?.data);
        console.log(data.token, '------------------')

        if (data) {
            localStorage.setItem(access_token, data?.token);

            Swal.fire({ icon: 'success', text: 'Login Successfully', showConfirmButton: false, timer: 2000 });
            yield call(payload?.onComplete);
            yield put({ type: actionTypes.GET_ADMIN_DETAIL, payload: { data: { id: data?.results?._id } } });
        }
    } catch (error) {
        console.log('Admin Login Saga Error ::: ', error.response);

        // Call the onError callback
        if (payload?.onError) {
            payload.onError();
        }
    }
}



// function* adminLogin(actions) {
//     try {
//       const { payload } = actions;
//       console.log(payload, "payimngh ::::::")
//       const response = yield axios({
//         method: 'post',
//         url: `http://194.238.17.230:4012/api/AdminLogin`,
//         data: payload,
//         headers: {
//           'Content-Type': 'application/json',
          
//         }
//       });
//       console.log("check the auth response", response?.data)
//       yield put({
//         type: actionTypes.,
//         payload: response,
  
//       });
//       console.log("navigate okay ahi ")
//     } catch (error) {
//       console.error('Error', error);
//     }
//   }

function* getAdminDetail(action) {
    try {
        const { payload } = action;
        console.log("Payload ::: ", payload)

        const { data } = yield postAPI(get_admin_detail, payload?.data);
        // console.log("Admin Detail Saga Response ::: ", data);

        if (data?.success) {
            yield put({ type: actionTypes.SET_ADMIN_DETAIL, payload: data?.results });
            if (data?.results?.type === "admin") {
                yield put({ type: actionTypes.SET_ADMIN_PERMISSION, payload: ['Dashboard', 'Player', 'Game History', 'Current Game', 'Payment', 'Setting'] });
            } else {
                yield put({ type: actionTypes.SET_ADMIN_PERMISSION, payload: data?.results?.Permissions });
            }
        } else {
            yield put({ type: actionTypes.SET_ADMIN_DETAIL, payload: {} });
            localStorage.clear();
            payload?.navigate('/login');
        }

    } catch (error) {
        console.log("Admin Detail Saga Error ::: ", error);
    }
};

export default function* authSaga() {
    yield takeLeading(actionTypes.ADMIN_LOGIN, adminLogin);
    yield takeLeading(actionTypes.GET_ADMIN_DETAIL, getAdminDetail);
}