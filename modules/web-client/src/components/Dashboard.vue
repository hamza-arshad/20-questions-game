<template>
    <div>
        <Header />
        <div class="container">
            <table id="games" class="alignCenter">
                <tr>
                    <th>
                        No.
                    </th>
                    <th>
                        Host
                    </th>
                    <th>
                        Opponent
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Created At
                    </th>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="text" placeholder="Word" v-model="word" /></td>
                    <td>
                        <select v-model="selectedUser">
                            <option disabled value="" selected>Please select one</option>
                            <option v-for="user in users" :key="user.id" v-bind:value="user.id">{{user.name}}</option>
                        </select>
                    </td>
                    <td><input type="button" @click="addNewGame" value="Add New Game" :disabled="isLoading" /></td>
                    <td></td>
                </tr>
                <tr v-for="({HostPlayer: {name: hostName}, OpponentPlayer: {name: opponentName}, winner, id, created_at: createdAt }, idx) in games" :key="id" @click="redirectToGame(id)">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ hostName }}</td>
                    <td>{{ opponentName }}</td>
                    <td>{{ winner ? winner === getUser.id ? 'Won' : 'Lost' : 'In Progress' }}</td>
                    <td>{{ createdAt | formatDate }}</td>
                </tr>
            </table>
            <p>{{ msg }}</p>
        </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import Header from './Header';
  import GameService from '@/services/GameService.js';
  import UserService from '@/services/UserService.js';

  export default {
    data() {
      return {
        games: [],
        msg: '',
        word: '',
        selectedUser: null,
        users: [],
        isLoading: false,
      };
    },
    components: {
      Header
    },
    sockets: {
      connect: function () {
        console.log('socket connected');
        this.$store.dispatch('connect');
        this.subscribeTo(this.getUser.id);
      },
      disconnect: function () {
        this.$store.dispatch('disconnect');
      }
    },
    async mounted() {
      this.games = await this.fetchGames();
      this.users = await this.fetchUsers();
      this.maintainSocketConnection();
    },
    beforeUnmount() {
      this.unsubscribeFrom(this.getUser.id);
    },
    computed: {
        ...mapGetters([
          'isConnected',
          'isLoggedIn',
          'getUser',
        ])
    },
    methods: {
      maintainSocketConnection() {
        if(!this.isConnected) {
          this.$socket.connect({
            options: { path: '', autoConnect: false, query: { token: this.isLoggedIn } }
          });
        } else {
          this.subscribeTo(this.getUser.id);
        }
      },
      subscribeTo(event) {
        this.sockets.subscribe(event, (data) => {
          this.games.unshift(data);
        });
      },
      unsubscribeFrom(event) {
        this.sockets.unsubscribe(event);
      },
      removeSocketSubscriptions() {
        this.sockets.removeAllListeners();
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      },
      async fetchUsers() {
        const usersResponse = await UserService.getAll(this.isLoggedIn);
        if(usersResponse.responseCode === 200) {
          return usersResponse.response;
        } else {
          return null;
        }
      },
      async fetchGames() {
        const gamesResponse = await GameService.getAll(this.isLoggedIn);
        if(gamesResponse.responseCode === 200) {
          return gamesResponse.response;
        } else {
          return null;
        }
      },
      redirectToGame(id) {
        this.$router.push({name: 'Game', params: {game: id}});
      },
      async addNewGame() {
        if(this.word && this.selectedUser) {
          const payload = {
            word: this.word,
            opponent_player: this.selectedUser,
          }
          this.isLoading = true;
          const game = await GameService.create(payload, this.isLoggedIn);
          if(game.responseCode === 200) {
            this.games = await this.fetchGames(this.isLoggedIn);
            this.word = '';
            this.selectedUser = null;
          } else {
            this.msg = "Unable to create new game";
          }
          this.isLoading = false;
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