<template>
    <div>
        <Header />
        <div class="container">
            <h1>{{host}} vs {{opponent}}</h1>
            <div v-if="isEnded">
                <h1>{{`You have ${status} the game`}}</h1>
            </div>
            <div v-else-if="!isHost">
                <input type="text" placeholder="Guess Word" v-model="wordGuess" />
                <input type="button" @click="submitWord" value="Submit" />
                <p>{{msg}}</p>
            </div>
            <div v-else>
                <p>Word: {{game.word}}</p>
            </div>
            <div>
                <table id="questions">
                    <tr>
                        <th>No.</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Asked At</th>
                    </tr>
                    <tr v-if="canAskQuestion">
                        <td></td>
                        <td><input type="text" placeholder="Question" v-model="questionText" /></td>
                        <td><input type="button" @click="submitQuestion" value="Submit" /></td>
                        <td></td>
                    </tr>
                    <tr v-for="({text, answer, id, created_at: createdAt}, idx) in questions" :key="id">
                        <td>{{idx + 1}}</td>
                        <td>{{text}}</td>
                        <td v-if="answer === null && canAnswerQuestion">
                            <select @change="(e) => submitAnswer(e.target.value, id)">
                                <option disabled value="" selected>Select Answer</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </td>
                        <td v-else>
                            {{ getAnswerText(answer) }}
                        </td>
                        <td>
                            {{ createdAt | formatDate }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import GameService from '@/services/GameService.js';
  import QuestionService from '@/services/QuestionService.js';
  import Header from './Header';

  export default {
    data() {
      return {
        name: 'Game',
        gameId: null,
        game: null,
        questionText: '',
        wordGuess: '',
        questions: [],
        msg: '',
        host: '',
        opponent: '',
      };
    },
    components: {
      Header,
    },
    sockets: {
      connect: function () {
        console.log('socket connected');
        this.$store.dispatch('connect');
        this.subscribeTo(this.gameId);
      },
      disconnect: function () {
        this.$store.dispatch('disconnect');
      }
    },
    mounted() {
      this.gameId = this.$route.params.game;
      this.getGameById(this.gameId);
      this.maintainSocketConnection();
    },
    beforeUnmount() {
      this.unsubscribeFrom(this.gameId);
    },
    computed: {
      isHost: function () {
        if (this.game)
            return this.game.host_player === this.getUser.id;
        return null;
      },
      isEnded: function() {
        if ( this.game )
            return this.game.winner ? true : false;
        return null;
      },
      status: function() {
        return this.isEnded && this.game.winner === this.getUser.id ? 'Won' : 'Lost';
      },
      canAskQuestion: function () {
        if( this.game && !this.isHost && !this.isEnded ) {
          const { questions } = this;
          for( let i=0; i<questions.length; i++) {
            if(questions[i].answer === null)
              return false;
          }
          return true;
        }
        return false;
      },
      canAnswerQuestion: function () {
        return this.isHost && !this.isEnded;
      },
      ...mapGetters([
        'isConnected',
        'isLoggedIn',
        'getUser',
      ])
    },
    methods: {
      maintainSocketConnection() {
        console.log(`is Connected ${this.isConnected}`);
        if(!this.isConnected) {
          this.$socket.connect();
        } else {
          this.subscribeTo(this.gameId);
        }
      },
      subscribeTo(event) {
        console.log(`subscribing ${event}`);
        this.sockets.subscribe(event, () => {
          this.getGameById(this.gameId);
        });
      },
      unsubscribeFrom(event) {
        this.sockets.unsubscribe(event);
      },
      async getGameById(gameId) {
        const response = await GameService.get(gameId, this.isLoggedIn);
        if(response.responseCode === 200) {
          const { response: game } = response;
          this.game = game;
          this.host = game.HostPlayer.name;
          this.opponent = game.OpponentPlayer.name;
          this.questions = game.Questions;
        } else {
          this.msg = "Unable to load game, please refresh.";
        }
      },

      async submitWord() {
        const response = await GameService.guessWord({ word: this.wordGuess }, this.gameId, this.isLoggedIn);
        if(response.responseCode !== 200) {
          this.msg = 'Wrong Guess';
        }
        this.wordGuess = '';
        await this.getGameById(this.gameId);
      },

      async submitQuestion() {
        const payload = {
          text: this.questionText,
          game_id: this.gameId
        }
        await QuestionService.create(payload, this.isLoggedIn);
        this.questionText = '';
        await this.getGameById(this.gameId);
      },
      async submitAnswer(answer, questionId) {
        await QuestionService.submitAnswer({answer: answer == true}, questionId, this.isLoggedIn);
        await this.getGameById(this.gameId);
      },
      getAnswerText (answer) {
        return answer !== null ? answer ? 'Yes' : 'No' : 'Waiting for Answer';
      }

    }
  }
</script>

<style scoped>
    #questions {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #questions td, #questions th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #questions tr:nth-child(even){background-color: #f2f2f2;}

    #questions tr:hover {background-color: #ddd;}

    #questions th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
    }
</style>