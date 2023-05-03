import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNIN_REQUESTING,
  SIGNIN_SUCCESS,
  USER_EDIT_REQUESTING,
  USER_EDIT_SUCCESS,
  USER_ADD_AVATAR,
  CLIENT_ERROR,
  CLEAR_ERROR,
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

const applySignUpRequest = state => ({
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

const applySignInRequest = state => ({
  ...state,
  requesting: true,
});

const applySignInSuccess = (state, action) => {
  const {
    token,
    _id,
    username,
    phoneNumber,
    avatar,
  } = action.responseJson.user;

  sessionStorage.setItem('jwt', token);
  return {
    ...state,
    requesting: false,
    successful: true,
    id: _id,
    username: username,
    phoneNumber: phoneNumber || 'unlisted',
    avatar: avatar || '',
  };
};

const applyUserEditRequesting = state => ({
  ...state,
  requesting: true,
});

const applyUserEditSuccess = (state, action) => {
  const { prop } = action.responseJson;
  return {
    ...state,
    requesting: false,
    successful: true,
    [prop.editField]: prop.edit,
  };
};

const applyUserAddAvatar = (state, action) => ({
  ...state,
  avatar: action.image,
});

const applyClientError = (state, action) => ({
  ...state,
  requesting: false,
  error: action.error.message,
});

const applyClearError = (state, action) => ({
  ...state,
  requesting: false,
  error: '',
});

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return applySignUpRequest(state);
    case SIGNUP_SUCCESS:
      return applySignUpSuccess(state, action);
    case SIGNIN_REQUESTING:
      return applySignInRequest(state);
    case SIGNIN_SUCCESS:
      return applySignInSuccess(state, action);
    case USER_EDIT_REQUESTING:
      return applyUserEditRequesting(state);
    case USER_EDIT_SUCCESS:
      return applyUserEditSuccess(state, action);
    case USER_ADD_AVATAR:
      return applyUserAddAvatar(state, action);
    case CLIENT_ERROR:
      return applyClientError(state, action);
    case CLEAR_ERROR:
      return applyClearError(state, action);

    default:
      return state;
  }
}

export default userReducer;
