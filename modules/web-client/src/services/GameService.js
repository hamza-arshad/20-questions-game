import CONSTANTS from "../constants";

export default {
  async getAll(token) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.GAME.ALL, {
      method: 'GET',
      headers: { ...CONSTANTS.REQUEST_HEADERS, 'Authorization': `Bearer ${token}` },
    });
    return await response.json();
  },

  async get(id, token) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.GAME.GET(id), {
      method: 'GET',
      headers: { ...CONSTANTS.REQUEST_HEADERS, 'Authorization': `Bearer ${token}` },
    });
    return await response.json();
  },

  async create(game, token) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.GAME.CREATE, {
      method: 'POST',
      body: JSON.stringify(game),
      headers: { ...CONSTANTS.REQUEST_HEADERS, 'Authorization': `Bearer ${token}` },
    })
    return await response.json();
  },

  async guessWord(word, id, token) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.GAME.GUESS_WORD(id), {
      method: 'PUT',
      body: JSON.stringify(word),
      headers: { ...CONSTANTS.REQUEST_HEADERS, 'Authorization': `Bearer ${token}` },
    })
    return await response.json();
  },

};