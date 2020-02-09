import {
  ADD_ITEM_SUCCESS,
  AUTH_SUCCESS,
  FETCH_SUCCESS,
  REMOVE_ITEM_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from 'actions';
import { TOGGLE_THEME } from '../actions';

const theme = localStorage.getItem('DARK_THEME');
const initialState = {
  userID: localStorage.getItem('userID') || null,
  darkTheme: !!(theme === 'true' || theme === null),
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
    case REGISTER_SUCCESS:
      return {
        ...state,
        /* eslint-disable no-underscore-dangle */
        userID: action.payload.data._id,
        /* eslint-enable */
        redirectToLogin: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        /* eslint-disable no-underscore-dangle */
        userID: null,
        /* eslint-enable */
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        [action.payload.itemType]: [...action.payload.data],
      };
    case TOGGLE_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    default:
      return state;
  }
};

export default rootReducer;
