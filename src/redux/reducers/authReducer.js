import * as actionTypes from '../action-types';

const initialState = {
    adminDetailData: {},
    adminPermissionData: ['Dashboard', 'Player', 'Contest', 'Users', 'Game History', 'Current Game', 'Payment', 'Setting'],
};

const authReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_ADMIN_DETAIL:
            return { ...state, adminDetailData: payload };

        case actionTypes.SET_ADMIN_PERMISSION:
            return { ...state, adminPermissionData: payload };

        default:
            return state;
    }
};

export default authReducer;