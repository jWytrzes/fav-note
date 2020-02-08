import { ADD_ITEM, REMOVE_ITEM, AUTH_SUCCESS, FETCH_SUCCESS } from 'actions';

const initialState = {
  userID: '5e3458ddbe560c2514db71f4',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return {
        ...state,
        [action.payload.itemType]: [
          ...state[action.payload.itemType].filter(item => item.id !== action.payload.id),
        ],
      };
    case ADD_ITEM:
      return {
        ...state,
        [action.payload.itemType]: [...state[action.payload.itemType], action.payload.item],
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
