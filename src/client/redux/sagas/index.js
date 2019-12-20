import { takeLatest, all } from 'redux-saga/effects';
import {
  SIGNUP_REQUESTING,
  SIGNIN_REQUESTING,
  USER_EDIT_REQUESTING,
  TODOS_INDEX_REQUESTING,
  TODO_POST_REQUESTING,
  TODO_EDIT_REQUESTING,
  TODO_REMINDER_POST_REQUESTING,
  TODOS_DELETE_REQUESTING,
} from '../constants';
import {
  handlePostSignUp,
  handlePostSignIn,
  handleEditUser,
} from './user';
import {
  handleFetchTodos,
  handlePostTodo,
  handleEditTodo,
  handlePostReminderTodo,
  handleDeleteTodos,
} from './todos';

function* rootSaga() {
  yield all([
    takeLatest(SIGNUP_REQUESTING, handlePostSignUp),
    takeLatest(SIGNIN_REQUESTING, handlePostSignIn),
    takeLatest(USER_EDIT_REQUESTING, handleEditUser),
    takeLatest(TODOS_INDEX_REQUESTING, handleFetchTodos),
    takeLatest(TODO_POST_REQUESTING, handlePostTodo),
    takeLatest(TODO_EDIT_REQUESTING, handleEditTodo),
    takeLatest(TODO_REMINDER_POST_REQUESTING, handlePostReminderTodo),
    takeLatest(TODOS_DELETE_REQUESTING, handleDeleteTodos),
  ]);
}

export default rootSaga;
