import * as actionTypes from '../action-types';

export const getPaymentRequest = payload => ({
    type: actionTypes.GET_PAYMENT_REQUEST, payload
});

export const setPaymentRequest = payload => ({
    type: actionTypes.SET_PAYMENT_REQUEST, payload
});

export const getPaymentHistory = payload => ({
    type: actionTypes.GET_PAYMENT_HISTORY, payload
});

export const setPaymentHistory = payload => ({
    type: actionTypes.SET_PAYMENT_HISTORY, payload
});

export const approveRejectPaymentRequest = payload => ({
    type: actionTypes.APPROVE_REJECT_PAYMENT_REQUEST, payload
});