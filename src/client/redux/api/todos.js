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
    const responseJson = await response.json();
    if (!response.ok) throw responseJson;
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
    const responseJson = await response.json();
    if (!response.ok) throw responseJson;
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

export { fetchTodos, postTodo, postReminderTodo, deleteTodos };
