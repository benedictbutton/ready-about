async function postSignUp(payload) {
  try {
    const response = await fetch(`/api/auth/signup`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const responseJson = await response.json();
    if (!response.ok) throw responseJson;
    sessionStorage.setItem('jwt', responseJson.user.token);
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

async function postSignIn(payload) {
  try {
    const response = await fetch(`/api/auth/signin`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const responseJson = await response.json();
    if (!response.ok) throw responseJson;
    sessionStorage.setItem('jwt', responseJson.user.token);
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

async function editUser(payload) {
  try {
    const response = await fetch(`/api/user`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.jwt}`,
      },
      body: JSON.stringify({
        user: {
          editProp: payload.editProp,
          edit: payload.value,
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

export { postSignUp, postSignIn, editUser };
