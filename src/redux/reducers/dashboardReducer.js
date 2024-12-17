import * as actionTypes from '../action-types';

const initialState = {
    dashboardData: [],
};

export const dashboardReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_DASHBOARD:
            return { ...state, dashboardData: payload };

        default:
            return state;
    }
};

export default dashboardReducer;