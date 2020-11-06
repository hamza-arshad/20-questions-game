const { endGame } = require('../game');
const SocketService = require('../../services/socket');
const { getBadRequestObject } = require('../../utils/helper');
const { RULES: {
  MAX_QUESTIONS_ALLOWED
}} = require('../../constants');

/**
 * Auth Service
 *
 */
const create =  async (payload, currentUserId) => {
  const { db: {
    models: {
      Question
    }
  }} = global;

  try {
    let question = await Question.createQuestion(payload);
    let event = question.game_id;
    SocketService.triggerUpdate(event, question);
  } catch (err){
    throw getBadRequestObject(`Unable to create new question: ${JSON.stringify(err)}`);
  }
};

const submitAnswer =  async (questionId, answer, currentUserId) => {
  const { db: {
    models: {
      Question
    }
  }} = global;

  try {
    let question = await Question.getQuestion(questionId);
    if(!question)
      throw 'Question not found';

    question = await question.update({answer: answer});
    let questionCount = await Question.getQuestionCountOfGame(question.game_id);
    if(questionCount >= MAX_QUESTIONS_ALLOWED) {
      await endGame(question.game_id, currentUserId);
    }
    SocketService.triggerUpdate(question.game_id, question);
    return question;
  } catch (err) {
    throw getBadRequestObject(`Couldn't submit answer: ${JSON.stringify(err)}`);
  }
};

const getAllByGame =  async (gameId) => {
  const { db: {
    models: {
      Question
    }
  }} = global;
  try {
    return await Question.getAllQuestionOfGame(gameId);
  } catch (err){
    throw getBadRequestObject(`Couldn't fetch questions: ${JSON.stringify(err)}`);
  }
};

module.exports = { getAllByGame, create, submitAnswer };