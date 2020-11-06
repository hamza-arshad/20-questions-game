import CONSTANTS from "../constants";

export default {
  async getAll(token) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.USER.ALL, {
      method: 'GET',
      headers: {...CONSTANTS.REQUEST_HEADERS, 'Authorization': `Bearer ${token}`},
    });
    return await response.json();
  },
}