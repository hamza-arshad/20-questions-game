import CONSTANTS from "../constants";

export default {
  async create(question, token) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.QUESTION.CREATE, {
      method: 'POST',
      body: JSON.stringify(question),
      headers: { ...CONSTANTS.REQUEST_HEADERS, 'Authorization': `Bearer ${token}` },
    })
    return await response.json();
  },

  async submitAnswer(answer, id, token) {
    let response = await fetch(CONSTANTS.API_BASE_URL + CONSTANTS.URLS.QUESTION.SUBMIT_ANSWER(id), {
      method: 'PUT',
      body: JSON.stringify(answer),
      headers: { ...CONSTANTS.REQUEST_HEADERS, 'Authorization': `Bearer ${token}` },
    })
    return await response.json();
  },
}