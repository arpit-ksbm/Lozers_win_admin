import * as actionTypes from '../action-types';

const initialState = {
    paymentRequestData: [],
    paymentHistoryData: []
};

const paymentReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_PAYMENT_REQUEST:
            return { ...state, paymentRequestData: payload };

        case actionTypes.SET_PAYMENT_HISTORY:
            return { ...state, paymentHistoryData: payload };

        default:
            return state;
    }
};

export default paymentReducer;