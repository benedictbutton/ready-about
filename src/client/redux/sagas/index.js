import { takeLatest, all } from 'redux-saga/effects';
import {
  SIGNUP_REQUESTING,
  SIGNIN_REQUESTING,
  TODOS_INDEX_REQUESTING,
  TODO_POST_REQUESTING,
  TODO_REMINDER_POST_REQUESTING,
  TODOS_DELETE_REQUESTING,
} from '../constants';
import { handlePostSignUp, handlePostSignIn } from './client';
import {
  handleFetchTodos,
  handlePostTodo,
  handlePostReminderTodo,
  handleDeleteTodos,
} from './todos';

function* rootSaga() {
  yield all([
    takeLatest(SIGNUP_REQUESTING, handlePostSignUp),
    takeLatest(SIGNIN_REQUESTING, handlePostSignIn),
    takeLatest(TODOS_INDEX_REQUESTING, handleFetchTodos),
    takeLatest(TODO_POST_REQUESTING, handlePostTodo),
    takeLatest(TODO_REMINDER_POST_REQUESTING, handlePostReminderTodo),
    takeLatest(TODOS_DELETE_REQUESTING, handleDeleteTodos),
  ]);
}

export default rootSaga;
