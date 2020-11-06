const { ERROR }  = require('../../utils/helper')

async function canGuessWord(req, res, next) {
  const { db: {
    models: {
      Game
    }
  }} = global;
  const {
    user: {
      userId
    },
    params: {
      id
    }
  } = req;
  const game = await Game.getGame(id);
  if ( game.opponent_player === userId ) {
    return next();
  }
  return ERROR(res,'Not allowed to guess in this game!', null, 401);
}

async function canAskQuestion(req, res, next) {
  const { db: {
    models: {
      Game
    }
  }} = global;
  const {
    user: {
      userId
    },
    body: {
      game_id
    }
  } = req;
  const game = await Game.getGame(game_id);
  if ( game.opponent_player === userId) {
    const { Questions } = game;
    for(let i = 0; i<Questions.length; i++)
      if(Questions[i].answer === null) {
        return next(null);
      }
    return next();
  }
  return ERROR(res,'Not allowed to ask questions in this game!', null, 401);
}

async function canAnswerQuestion(req, res, next) {
  const { db: {
    models: {
      Question,
    }
  }} = global;

  const {
    user: {
      userId
    },
    params: {
      id
    }
  } = req;

  const question = await Question.getQuestion(id);
  const { Game: game } = question;

  if ( game.host_player === userId && question.answer === null ) {
    return next();
  }
  return ERROR(res,'Not allowed to answer questions in this game!', null, 401);
}

module.exports = {
  canAnswerQuestion,
  canAskQuestion,
  canGuessWord
}