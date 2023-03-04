import { combineReducers } from 'redux';
import { tokenReduce } from './token';

export const rootReducer = combineReducers({
  tokenReduce,
});
