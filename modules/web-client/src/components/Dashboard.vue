<template>
    <div>
        <Header />
        <div class="container">
            <table id="games" class="alignCenter">
                <tr>
                    <th>
                        Host
                    </th>
                    <th>
                        Opponent
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
                <tr>
                    <td><input type="text" placeholder="Word" v-model="word" /></td>
                    <td>
                        <select v-model="user">
                            <option disabled value="" selected>Please select one</option>
                            <option v-for="user in users" :key="user.id" v-bind:value="user.id">{{user.name}}</option>
                        </select>
                    </td>
                    <td><input type="button" @click="addNewGame" value="Add New Game" /></td>
                </tr>
                <tr v-for="game in games" :key="game.id" @click="redirectToGame(game)">
                    <td>{{game.HostPlayer.name}}</td>
                    <td>{{game.OpponentPlayer.name}}</td>
                    <td>{{ game.winner ? game.winner === currentUserId ? 'Won' : 'Lost' : 'In Progress' }}</td>
                </tr>
            </table>
            <p>{{ msg }}</p>
        </div>
    </div>
</template>
<script>
  import Header from './Header';
  import GameService from '@/services/GameService.js';
  import UserService from '@/services/UserService.js';
  import store from "../store";

  export default {
    data() {
      return {
        games: [],
        name: '',
        msg: '',
        word: '',
        user: null,
        users: [],
        currentUserId: null,
      };
    },
    components: {
      Header
    },
    sockets: {
      connect: function () {
        console.log('socket connected');
        this.subscribeTo(this.currentUserId);
      },
    },
    async mounted() {
      this.name = this.$store.getters.getUser.name;
      this.currentUserId = this.$store.getters.getUser.id;
      this.games = await this.fetchGames();
      this.users = await this.fetchUsers();
      this.maintainSocketConnection();
    },
    methods: {
      maintainSocketConnection() {
        if(!this.$store.getters.isConnected) {
          this.$socket.connect({
            options: { path: '', autoConnect: false, query: { token: store.getters.isLoggedIn } }
          });
        } else {
          this.subscribeTo(this.currentUserId);
        }
      },
      subscribeTo(event) {
        this.sockets.subscribe(event, (data) => {
          this.games.push(data);
        });
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      },
      async fetchUsers() {
        const token = this.$store.getters.isLoggedIn;
        let usersResponse = await UserService.getAll(token);
        if(usersResponse.responseCode === 200) {
          return usersResponse.response;
        } else {
          return null;
        }
      },
      async fetchGames() {
        let token = this.$store.getters.isLoggedIn;
        let gamesResponse = await GameService.getAll(token);
        if(gamesResponse.responseCode === 200) {
          return gamesResponse.response;
        } else {
          return null;
        }
      },
      redirectToGame(game) {
        this.$router.push({name: 'Game', params: {game: game.id}});
      },
      async addNewGame() {
        if(this.loading)
          return;
        let token = this.$store.getters.isLoggedIn;
        if(this.word && this.user) {
          let payload = {
            word: this.word,
            opponent_player: this.user,
          }
          this.loading = true;
          let game = await GameService.create(payload, token);
          if(game.responseCode === 200) {
            this.games = await this.fetchGames(token);
            this.word = '';
            this.user = null;
          } else {
            this.msg = "Unable to create new game";
          }
          this.loading = false;
        } else {
          this.msg = "Please enter word and select user.";
        }
      },
    },
  };
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 2rem;
        align-items: center;
    }
    .alignCenter {
        align-self: center;
    }
    #games {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #games td, #games th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #games tr:nth-child(even){background-color: #f2f2f2;}

    #games tr:hover {background-color: #ddd;}

    #games th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
    }
</style>