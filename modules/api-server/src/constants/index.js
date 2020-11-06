const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 5000,
  HASH_ROUNDS: 4,
  ROLES: {
    PLAYER: 'PLAYER',
  },
  RULES: {
    MAX_QUESTIONS_ALLOWED: 20
  },
  EXPIRY: 36000
}