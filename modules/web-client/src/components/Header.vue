<template>
    <div class="header-container">
        <h2>Hi, {{name}}</h2>
        <input type="button" value="Logout" @click="logout" />
    </div>
</template>

<script>
  export default {
    data() {
      return {
        name: ''
      }
    },
    mounted() {
      this.name = this.$store.getters.getUser.name;
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        // this.$router.push('/login');
      },
    }
  }
</script>

<style scoped>
    .header-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-bottom: 0.2rem solid black;
    }

    .header-container input {
        border: none;
        background: none;
    }

    .header-container input:hover {
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }
</style>