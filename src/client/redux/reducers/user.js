import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNIN_REQUESTING,
  SIGNIN_SUCCESS,
  CLIENT_ERROR,
  USER_ADD_AVATAR,
  USER_REMOVE_AVATAR,
  USER_UPDATE_PHONENUMBER,
} from '../constants';

const INITIAL_STATE = {
  requesting: false,
  successful: false,
  id: null,
  username: '',
  phoneNumber: 'unlisted',
  avatar: '',
  error: '',
};

const applySignUpRequest = (state, action) => ({
  ...state,
  requesting: true,
});

const applySignUpSuccess = (state, action) => ({
  ...state,
  requesting: false,
  successful: true,
  id: action.responseJson.user._id,
  username: action.responseJson.user.username,
  phoneNumber: action.responseJson.user.phoneNumber || 'unlisted',
});

const applySignInRequest = (state, action) => ({
  ...state,
  requesting: true,
});

const applySignInSuccess = (state, action) => ({
  ...state,
  requesting: false,
  successful: true,
  id: action.responseJson.user._id,
  username: action.responseJson.user.username,
  phoneNumber: action.responseJson.user.phoneNumber,
  avatar: action.responseJson.user.avatar,
});

const applyClientError = (state, action) => ({
  ...state,
  requesting: false,
  error: action.error.errors,
});

const applyUserAddAvatar = (state, action) => ({
  ...state,
  avatar: action.image,
});

const applyUserUpdatePhoneNumber = (state, action) => ({
  ...state,
  phoneNumber: action.responseJson.user.phoneNumber,
});

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return applySignUpRequest(state, action);
    case SIGNUP_SUCCESS:
      return applySignUpSuccess(state, action);
    case SIGNIN_REQUESTING:
      return applySignInRequest(state, action);
    case SIGNIN_SUCCESS:
      return applySignInSuccess(state, action);
    case CLIENT_ERROR:
      return applyClientError(state, action);
    case USER_ADD_AVATAR:
      return applyUserAddAvatar(state, action);
    case USER_UPDATE_PHONENUMBER:
      return applyUserUpdatePhoneNumber(state, action);

    default:
      return state;
  }
}

export default userReducer;
