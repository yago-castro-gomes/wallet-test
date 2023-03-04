import { SAVE_TOKEN, SAVE_BALANCE } from '../actions';

export const INITIAL_STATE = {
  token: [],
  balance: [],
};

export const tokenReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case SAVE_BALANCE:
    return {
      ...state,
      balance: action.payload,
    };
  default: return state;
  }
};
