<template>
  <div id="app">
    <div id="nav" v-if="$store.state.login == true">
      <router-link to="/">Cards</router-link> |
      <router-link to="/words">Words</router-link>
    </div>
    <router-view/>
  </div>
</template>

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
  background-image: url("./assets/background.png");
  background-repeat: repeat;
  background-position: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
