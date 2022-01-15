const create = async (user) => {
  // console.log(user);
  try {
    let response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch("/api/users/", {
      method: "GET",
      signal: signal,
    });

    return await response.json();
  } catch (error) {
    console.log("We have an error :(");
    console.log(error);
  }
};

/**
 * Read the user from GET /api/users/:userId
 * @param {{userId: string}} params Object containing the user Id to attempt access
 * @param {{t: Object}} credentials Object containin a Json Web Token from the client
 * @param {*} signal
 */
const read = async (params, credentials, signal) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * Update the user from PUT /api/users/:userId
 * @param {{userId: string}} params Object containing the user Id to attempt access
 * @param {{t: Object}} credentials Object containin a Json Web Token from the client
 * @param {Object} user An object containing the updated user data
 * @param {*} signal
 */
const update = async (params, credentials, user) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "PUT",
      // signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/users/" + params.userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { create, list, read, update, remove };
