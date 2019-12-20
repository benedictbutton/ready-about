import { normalize } from 'normalizr';
import { todoSchema } from '../schemas';

async function fetchTodos() {
  try {
    const response = await fetch(`/api/todos`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.jwt}`,
      },
    });
    if (!response.ok) throw response.status;
    const responseJson = await response.json();
    // const data = normalize(responseJson.todos, [todoSchema]);
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

async function postTodo(payload) {
  try {
    const response = await fetch(`/api/todos`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.jwt}`,
      },
      body: JSON.stringify(payload.values),
    });
    if (!response.ok) throw response.status;
    const responseJson = await response.json();
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

async function editTodo(payload) {
  try {
    const response = await fetch(`/api/todos`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.jwt}`,
      },
      body: JSON.stringify({
        todo: {
          id: payload.selected,
          editProp: payload.editProp,
          edit: payload.values,
        },
      }),
    });
    if (!response.ok) throw response.status;
    const responseJson = await response.json();
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

async function postReminderTodo(payload) {
  try {
    const response = await fetch(`/api/appointments`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.jwt}`,
      },
      body: JSON.stringify(payload.values),
    });
    const responseJson = await response.json();
    if (!response.ok) throw responseJson;
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

async function deleteTodos(payload) {
  try {
    const response = await fetch(`/api/todos`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.jwt}`,
      },
      body: JSON.stringify(payload),
    });
    const responseJson = await response.json();
    if (!response.ok) throw responseJson;
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

export {
  fetchTodos,
  postTodo,
  editTodo,
  postReminderTodo,
  deleteTodos,
};
