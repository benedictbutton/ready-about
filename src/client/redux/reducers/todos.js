import {
  TODOS_INDEX_REQUESTING,
  TODOS_INDEX_SUCCESS,
  TODO_POST_REQUESTING,
  TODO_POST_SUCCESS,
  TODO_EDIT_REQUESTING,
  TODO_EDIT_SUCCESS,
  TODO_REMINDER_POST_REQUESTING,
  TODO_REMINDER_POST_SUCCESS,
  TODOS_DELETE_REQUESTING,
  TODOS_DELETE_SUCCESS,
  TODOS_ERROR,
} from '../constants';

const INITIAL_STATE = {
  requesting: false,
  successful: false,
  todos: [],
  error: '',
};

const doApplyTodosIndexRequesting = (state, action) => ({
  ...state,
  requesting: true,
});

const doApplyTodosIndexSuccess = (state, action) => ({
  ...state,
  requesting: false,
  successful: true,
  todos: action.responseJson.todos,
});

const doApplyTodoPostRequesting = (state, action) => ({
  ...state,
  requesting: true,
});

const doApplyTodoPostSuccess = (state, action) => ({
  ...state,
  requesting: false,
  successful: true,
  todos: [...state.todos, action.responseJson.todo],
});

const doApplyTodoEditRequesting = (state, action) => ({
  ...state,
  requesting: true,
});

const doApplyTodoEditSuccess = (state, action) => {
  const newTodos = state.todos.map(todo => {
    if (todo._id === action.responseJson.todo._id)
      return { ...todo, item: action.responseJson.todo.item };
    return todo;
  });

  return {
    ...state,
    requesting: false,
    successful: true,
    todos: newTodos,
  };
};

const doApplyTodoReminderPostRequesting = (state, action) => ({
  ...state,
  requesting: true,
});

const doApplyTodoReminderPostSuccess = (state, action) => {
  debugger;
  // const newTodos = state.todos.map(todo => {
  //   if (todo.id === action.responseJson.id)
  //     todo[appointment] = action.responseJson.appoinment;
  //   return { todo };
  // });
  return {
    ...state,
    requesting: false,
    successful: true,
  };
};

const doApplyTodosDeleteRequesting = (state, action) => ({
  ...state,
  requesting: true,
});

const doApplyTodosDeleteSuccess = (state, action) => {
  const newTodos = state.todos.filter(
    el => !action.responseJson.includes(el._id),
  );
  return {
    ...state,
    requesting: false,
    successful: true,
    todos: newTodos,
  };
};

const doApplyTodosError = (state, action) => ({
  ...state,
  requesting: false,
  successful: false,
  error: action.error,
});

const todosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TODOS_INDEX_REQUESTING:
      return doApplyTodosIndexRequesting(state, action);
    case TODOS_INDEX_SUCCESS:
      return doApplyTodosIndexSuccess(state, action);
    case TODO_POST_REQUESTING:
      return doApplyTodoPostRequesting(state, action);
    case TODO_POST_SUCCESS:
      return doApplyTodoPostSuccess(state, action);
    case TODO_EDIT_REQUESTING:
      return doApplyTodoEditRequesting(state, action);
    case TODO_EDIT_SUCCESS:
      return doApplyTodoEditSuccess(state, action);
    case TODO_REMINDER_POST_REQUESTING:
      return doApplyTodoReminderPostRequesting(state, action);
    case TODO_REMINDER_POST_SUCCESS:
      return doApplyTodoReminderPostSuccess(state, action);
    case TODOS_DELETE_REQUESTING:
      return doApplyTodosDeleteRequesting(state, action);
    case TODOS_DELETE_SUCCESS:
      return doApplyTodosDeleteSuccess(state, action);
    case TODOS_ERROR:
      return doApplyTodosError(state, action);
    default:
      return state;
  }
};

export default todosReducer;
