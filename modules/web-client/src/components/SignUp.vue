<template>
    <div class="container">
        <h1 class="alignCenter">Sign Up</h1>
        <input class="topMargin" type="text" placeholder="Full Name" v-model="name" />
        <input class="topMargin" type="text" placeholder="Email" v-model="email" />
        <input class="topMargin" type="password" placeholder="Password" v-model="password" />
        <div class="topMargin btn-group">
            <input type="button" @click="signUp" value="Sign Up" />
            <input type="button" @click="login" value="Login" />
        </div>
        <p v-if="msg">{{ msg }}</p>
    </div>
</template>
<script>
  import AuthService from '@/services/AuthService.js';
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        msg: ''
      };
    },
    methods: {
      login() {
        this.$router.push('/login');
      },
      async signUp() {
        try {
          const credentials = {
            name: this.name,
            email: this.email,
            password: this.password,
          };
          const response = await AuthService.signUp(credentials);
          this.msg = response.responseMessage;
          if(response.responseCode === 200) {
            const token = response.response.token;
            const user = { name: response.response.name, email: response.response.email, id: response.response.id };
            this.$store.dispatch('login', {token, user});
            this.$router.push('/');
          }
        } catch (error) {
          this.msg = error.response.data.msg;
        }
      }
    }
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
    .topMargin {
        margin-top: 0.1rem;
    }

    .btn-group {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .btn-group input {
        margin: 1rem;
    }
</style>