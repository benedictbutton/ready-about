import { call, put } from "redux-saga/effects";
import {
  TODOS_INDEX_SUCCESS,
  TODO_POST_SUCCESS,
  TODO_REMINDER_POST_SUCCESS,
  TODOS_DELETE_SUCCESS,
  TODOS_ERROR
} from "../constants";
import {
  fetchTodos,
  postTodo,
  postReminderTodo,
  deleteTodos
} from "../api/todos";

function* handleFetchTodos() {
  const { responseJson, error } = yield call(fetchTodos);
  if (responseJson) yield put({ type: TODOS_INDEX_SUCCESS, responseJson });
  else yield put({ type: TODOS_ERROR, error });
}

function* handlePostTodo(payload) {
  const { responseJson, error } = yield call(postTodo, payload);
  if (responseJson) yield put({ type: TODO_POST_SUCCESS, responseJson });
  else yield put({ type: TODOS_ERROR, error });
}

function* handlePostReminderTodo(payload) {
  const { responseJson, error } = yield call(postReminderTodo, payload);
  if (responseJson)
    yield put({ type: TODO_REMINDER_POST_SUCCESS, responseJson });
  else yield put({ type: TODOS_ERROR, error });
}

function* handleDeleteTodos(payload) {
  const { responseJson, error } = yield call(deleteTodos, payload);
  if (responseJson) yield put({ type: TODOS_DELETE_SUCCESS, responseJson });
  else yield put({ type: TODOS_ERROR, error });
}

export {
  handleFetchTodos,
  handlePostTodo,
  handlePostReminderTodo,
  handleDeleteTodos
};
