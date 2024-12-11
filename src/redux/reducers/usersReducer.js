import * as actionTypes from '../action-types';

const initialState = {
    usersData: [],
};

export const usersReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_USERS:
            return { ...state, usersData: payload };

        default:
            return state;
    }
};

export default usersReducer;