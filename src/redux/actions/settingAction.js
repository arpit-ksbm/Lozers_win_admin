import * as actionTypes from '../action-types';

//! Sub admin
export const getSubadmin = payload => ({
    type: actionTypes.GET_SUB_ADMIN, payload
});

export const setSubadmin = payload => ({
    type: actionTypes.SET_SUB_ADMIN, payload
});

export const createSubadmin = payload => ({
    type: actionTypes.CREATE_SUB_ADMIN, payload
});

export const updateSubadmin = payload => ({
    type: actionTypes.UPDATE_SUB_ADMIN, payload
});

export const deleteSubadmin = payload => ({
    type: actionTypes.DELETE_SUB_ADMIN, payload
});

//! Admin
export const changeAdminPassword = payload => ({
    type: actionTypes.CHANGE_ADMIN_PASSWORD, payload
});

//! Settings
export const setProfit = payload => ({
    type: actionTypes.SET_PROFIT, payload
});