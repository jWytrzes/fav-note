import { ADD_ITEM_SUCCESS, AUTH_SUCCESS, FETCH_SUCCESS, REMOVE_ITEM_SUCCESS } from 'actions';

const initialState = {
  userID: '5e3458ddbe560c2514db71f4',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(item => item._id !== action.payload.id),
        ],
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.data],
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        /* eslint-disable no-underscore-dangle */
        userID: action.payload.data._id,
        /* eslint-enable */
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
    default:
      return state;
  }
};

export default rootReducer;
