import { combineReducers } from 'redux';
import userReducer from './user';
import todosReducer from './todos';

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
});

export default rootReducer;
