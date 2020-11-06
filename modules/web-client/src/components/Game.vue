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
            <div>
                <table id="questions">
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                    <tr v-if="canAskQuestion">
                        <td><input type="text" placeholder="Question" v-model="questionText" /></td>
                        <td><input type="button" @click="submitQuestion" value="Submit" /></td>
                    </tr>
                    <tr v-for="question in questions" :key="question.id">
                        <td>{{question.text}}</td>
                        <td v-if="question.answer === null && canAnswerQuestion">
                            <select @change="(e) => submitAnswer(e.target.value, question.id)">
                                <option disabled value="" selected>Select Answer</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </td>
                        <td v-else>
                            {{ getAnswerText(question) }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
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
        this.subscribeTo(this.gameId);
      },
    },
    mounted() {
      this.gameId = this.$route.params.game;
      this.getGameById(this.gameId);
      this.maintainSocketConnection();
    },
    computed: {
      isHost: function () {
        if (this.game)
            return this.game.host_player === this.$store.getters.getUser.id;
        return null;
      },
      isEnded: function() {
        if ( this.game )
            return this.game.winner ? true : false;
        return null;
      },
      status: function() {
        return this.isEnded && this.game.winner === this.$store.getters.getUser.id ? 'Won' : 'Lost';
      },
      canAskQuestion: function () {
        if( this.game && !this.isHost && !this.isEnded ) {
          console.log("ASKING");
          let { questions } = this;
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
    },
    methods: {
      maintainSocketConnection() {
        if(!this.$store.getters.isConnected) {
          this.$socket.connect();
        } else {
          this.subscribeTo(this.gameId);
        }
      },
      subscribeTo(event) {
        this.sockets.subscribe(event, () => {
          this.getGameById(this.gameId);
        });
      },
      async getGameById(gameId) {
        let token = this.$store.getters.isLoggedIn;
        const game = await GameService.get(gameId, token);
        if(game.responseCode === 200) {
            this.game = game.response;
            this.host = this.game.HostPlayer.name;
            this.opponent = this.game.OpponentPlayer.name;
            this.questions = this.game.Questions;
        } else {
          this.msg = "Unable to load game, please refresh.";
        }
      },

      async submitWord() {
        let token = this.$store.getters.isLoggedIn;
        let response = await GameService.guessWord({ word: this.wordGuess }, this.gameId, token);
        if(response.responseCode !== 200) {
          this.msg = 'Wrong Guess';
        }
        this.wordGuess = '';
        await this.getGameById(this.gameId);
      },

      async submitQuestion() {
        let token = this.$store.getters.isLoggedIn;
        let payload = {
          text: this.questionText,
          game_id: this.gameId
        }
        await QuestionService.create(payload, token);
        await this.getGameById(this.gameId);
      },

      async submitAnswer(answer, questionId) {
        let token = this.$store.getters.isLoggedIn;
        await QuestionService.submitAnswer({answer: answer == true}, questionId, token);
        await this.getGameById(this.gameId);
      },

      getAnswerText (question) {
        return question.answer !== null ? question.answer ? 'Yes' : 'No' : 'Waiting for Answer';
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