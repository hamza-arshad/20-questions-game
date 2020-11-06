import CONSTANTS from "../constants";

export default {
  async login (credentials) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: CONSTANTS.REQUEST_HEADERS,
    });
    return await response.json();
  },
  async signUp(credentials) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.AUTH.SIGN_UP, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: CONSTANTS.REQUEST_HEADERS,
    })
    return await response.json();
  },
};