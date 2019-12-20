import { call, put } from 'redux-saga/effects';
import {
  SIGNUP_SUCCESS,
  SIGNIN_SUCCESS,
  USER_EDIT_SUCCESS,
  CLIENT_ERROR,
} from '../constants';
import { postSignUp, postSignIn, editUser } from '../api/user';

function* handlePostSignUp(values) {
  const { payload } = values;
  const { responseJson, error } = yield call(postSignUp, payload);
  if (responseJson) yield put({ type: SIGNUP_SUCCESS, responseJson });
  else yield put({ type: CLIENT_ERROR, error });
}

function* handlePostSignIn(values) {
  const { payload } = values;
  const { responseJson, error } = yield call(postSignIn, payload);
  if (responseJson) yield put({ type: SIGNIN_SUCCESS, responseJson });
  else yield put({ type: CLIENT_ERROR, error });
}

function* handleEditUser(payload) {
  const { responseJson, error } = yield call(editUser, payload);
  if (responseJson)
    yield put({ type: USER_EDIT_SUCCESS, responseJson });
  else yield put({ type: CLIENT_ERROR, error });
}

export { handlePostSignUp, handlePostSignIn, handleEditUser };
