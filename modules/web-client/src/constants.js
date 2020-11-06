const CONSTANTS = {
  API_BASE_URL: 'http://localhost:5000/api',
  SOCKET_URL: 'http://localhost:5000',
  URLS: {
    AUTH: {
      LOGIN: '/auth/login',
      SIGN_UP: '/auth/register'
    },
    USER: {
      ALL: '/user/all',
    },
    GAME: {
      GET: (id) => `/game/${id}`,
      ALL: '/game/all',
      CREATE: '/game/create',
      GUESS_WORD: (id) => `/game/guess-word/${id}`,
    },
    QUESTION: {
      CREATE: '/question/create',
      SUBMIT_ANSWER: (id) => `/question/submit-answer/${id}`,
    },
  },
  HTTP_STATUS: {
    HTTP_STATUS_UNAUTHORIZED: 401,
  },
  REQUEST_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
}

export default CONSTANTS;