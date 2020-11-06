const { getBadRequestObject, getNoContentObject, getUnauthorizedRequestObject } = require('../../utils/helper');
const SocketService = require('../../services/socket');

/**
 * Game Service
 *
 */
const create = async (payload) => {
  const { db: {
    models: {
      Game
    }
  }} = global;
  try {
    let game = await Game.createGame(payload);
    game = await Game.getGame(game.id);
    SocketService.triggerUpdate(game.opponent_player, game);
    return game;
  } catch (err) {
    throw getBadRequestObject(`Unable to create new game: ${JSON.stringify(err)}`);
  }
};

const guessWord = async (gameId, word) => {
  const { db: {
    models: {
      Game
    }
  }} = global;

  let game = await Game.getGame(gameId);
  if (game.word === word) {
    game = await endGame(gameId, game.opponent_player);
    SocketService.triggerUpdate(game.id, game);
    return game;
  }
  throw getBadRequestObject(`Word Match failed: ${JSON.stringify(err)}`);
}

const endGame = async (gameId, winner) => {
  const { db: {
    models: {
      Game
    }
  }} = global;

  try {
    let game = await Game.getGame(gameId);
    if(!game) {
      throw `Game Doesn't exist`;
    }
    game = await game.update({winner: winner});
    return game;
  } catch (err) {
    console.log(`Couldn't end game: ${JSON.stringify(err)}`)
    throw getBadRequestObject(`Couldn't end game: ${JSON.stringify(err)}`);
  }
};

const getAllByUser = async (userId) => {
  const { db: {
    models: {
      Game
    }
  }} = global;

  try {
    return await Game.getAllGamesOfUser(userId);
  } catch (err){
    throw getBadRequestObject(`Couldn't update game: ${JSON.stringify(err)}`);
  }
};

const get = async (gameId, currentUserId) => {
  const { db: {
    models: {
      Game
    }
  }} = global;

  try {
    let game = await Game.getGame(gameId);
    if( game.opponent_player === currentUserId )
      delete game.word;
    return game;
  } catch (err){
    throw getNoContentObject(`Couldn't get game: ${JSON.stringify(err)}`);
  }
};

module.exports = { getAllByUser, create, endGame, guessWord, get };