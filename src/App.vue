<template>
  <div id="app" :style="{ backgroundImage: `url(${src})` }">
    <div id="bgFade"></div>
    <div id="view">
      <nav v-if="$store.state.login == true">
        <router-link to="/account">Account</router-link> |
        <router-link to="/cards">Cards</router-link> |
        <router-link to="/words">Words</router-link>
      </nav>
      <router-view/>
    </div>
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
    },
    beforeMount(){
      var that = this;
      function importAll (r) {
        console.log(r);
        r.keys().forEach(key => that.imgCache[key] = r(key));
      }

      importAll(require.context('./assets/backgrounds/', true, /\.jpg$/));
    },
    computed: {
      src(){
        var lang = this.$store.getters.currentLang,
            key = `./bg-${lang}.jpg`,
            url = this.imgCache[key],
            that = this;

        console.log(lang);
        console.log(key);
        console.log(that.imgCache);
        console.log(url);

        return url;
      }
    },
    data(){ 
      return {
        imgCache: {}
      }
    }
  }
</script>

<style lang="scss">
html {
  background-color: #337EFF;
  background-image: url("assets/foggy-birds.png");  
  background-repeat: repeat;
  background-position: center;
}
html, body, #app {
  padding: 0px;
  margin: 0px;
}
h1,h2,h3,h4, optgroup, thead, .md-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700 !important;
  font-style: bolder;
}
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  min-height: 100%;
  position: absolute;

  #bgFade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
    z-index: 1;
  }

  #view {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
}
nav {
  padding: 30px;
  z-index: 9;
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

@media (max-width: 420px){
  nav {
    padding: 0px !important;
  }
}

</style>
