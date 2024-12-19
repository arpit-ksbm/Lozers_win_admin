import * as actionTypes from '../action-types';

const initialState = {
  pointsData: [],
};

export const pointsReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_POINTS:
      return { ...state, pointsData: payload }; // Update the state with fetched points

    case actionTypes.UPDATE_POINTS: // Optional: Can log actions here for debugging
      console.log("UPDATE_POINTS action triggered with payload:", payload);
      return state;

    default:
      return state;
  }
};

export default pointsReducer;
