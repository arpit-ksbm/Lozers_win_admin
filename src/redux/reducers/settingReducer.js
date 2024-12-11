import * as actionTypes from '../action-types';

const initialState = {
    subadminData: [],
};

export const settingReducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case actionTypes.SET_SUB_ADMIN:
            return { ...state, subadminData: payload };

        default:
            return state;
    }
}

export default settingReducer;