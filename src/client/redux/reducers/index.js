import { combineReducers } from 'redux';
import userReducer from './user';
import todosReducer from './todos';

const appReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT') {
    sessionStorage.removeItem('jwt');
    localStorage.removeItem('state');
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
