<template>
  <div id="app">
    <div id="nav" v-if="$store.state.login == true">
      <router-link to="/account">Account</router-link> |
      <router-link to="/cards">Cards</router-link> |
      <router-link to="/words">Words</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    watch: {
      $route (to, from){
        if (this.$store.state.login == false) {
          this.$router.push({ name: "login" })
        }
      }
    }  
  }
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #337EFF;
/* background-image: url("./assets/background.png"); -->
  background-color: #0062ad; */
  background-image: url("https://www.transparenttextures.com/patterns/foggy-birds.png");  
  background-repeat: repeat;
  background-position: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: white;
    display: inline-block;
    &.router-link-exact-active {
      transform: scale(1.4);
      margin: 20px;
    }
  }
}
</style>
