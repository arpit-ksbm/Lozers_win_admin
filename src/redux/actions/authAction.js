import * as actionTypes from "../action-types";

export const adminLogin = payload => ({
    type: actionTypes.ADMIN_LOGIN, payload,
});

export const getAdminDetail = payload => ({
    type: actionTypes.GET_ADMIN_DETAIL, payload,
});

export const setAdminDetail = payload => ({
    type: actionTypes.SET_ADMIN_DETAIL, payload,
});

export const setAdminPermission = payload => ({
    type: actionTypes.SET_ADMIN_PERMISSION, payload,
});