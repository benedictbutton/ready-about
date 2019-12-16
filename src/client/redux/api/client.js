async function postSignUp(payload) {
  try {
    let response = await fetch(`/api/auth/signup`, {
      credentials: "same-origin",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json();
    if (!response.ok) throw responseJson;
    sessionStorage.setItem("jwt", responseJson.user.token);
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

async function postSignIn(payload) {
  try {
    let response = await fetch(`/api/auth/signin`, {
      credentials: "same-origin",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json();
    if (!response.ok) throw responseJson;
    sessionStorage.setItem("jwt", responseJson.user.token);
    return { responseJson };
  } catch (error) {
    return { error };
  }
}

export { postSignUp, postSignIn };
