<template>
  <div id="app" :style="{ backgroundImage: `url(${url})` }">
    <div id="bgFade"></div>
    <div id="view">
      <!-- <nav> -->
      <nav v-if="$store.state.jwt != ''">  
        <router-link to="/account">{{accountText}}</router-link> |
        <router-link to="/cards">{{cardsText}}</router-link> |
        <router-link to="/words">{{wordsText}}</router-link>
      </nav>
      <router-view/>
    </div>
    <Preloader v-if="$store.getters.showPreloader == true" />
  </div>
</template>

<script>
  import Preloader from "./components/Preloader.vue";
  import {mapGetters} from 'vuex';

  export default {
    components: {
      Preloader
    },
    watch: {
      $route (to, from){
        if (this.$store.state.jwt == '') {
          this.$router.push({ name: "login" })
        }
      },
      '$store.state.menuKey'(val){
        let translation = val.translation;
        this.accountText = translation.account;
        this.passwordText = translation.password;
        this.wordsText = translation.words;
        this.cardsText = translation.cards;
      },
      '$store.state.currentList.nativeLanguage'(nativeLanguage){
        const language = this.$store.state.languagesBGKey[nativeLanguage.toLowerCase()],
              languagesList = this.$store.state.languages[language],
              languageBG = languagesList[Math.floor(Math.random() * ((languagesList.length-1) - 0) + 0)][1],
              key = window.innerWidth > 768 ? 
                      `./backgrounds/desktop/bg-${languageBG}.jpg` :
                      `./backgrounds/mobile/bg-${languageBG}.jpg`;
              
        this.url = this.imgCache[key];
      }
    },
    beforeMount(){
      const importAll = (r) => {
        r.keys().forEach(key => this.imgCache[key] = r(key));
      }

      importAll(require.context('./assets/', true, /\.jpg$/));
    },
    data(){ 
      return {
        imgCache: {},
        accountText: "Account",
        cardsText: "Cards",
        wordsText: "Words",
        url: ""
      }
    }
  }
</script>

<style lang="scss">
  html {
    background-color: #337EFF;
    overflow: hidden;
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
    padding: 0px;
    z-index: 9;
    a {
      font-weight: bold;
      color: white;
      display: inline-block;
      text-transform: lowercase;
      &.router-link-exact-active {
        transform: scale(1.4);
        margin: 20px;
      }
    }
  }

  .md-menu-content-container {
    background-color: white !important;
  }

  @media (max-width: 1023px){
    #app {
      background-repeat: repeat-y;
      background-size: contain;
      background-position: top center;
    }
  }

  @media (max-width: 850px) and (orientation: landscape){
    nav {
      padding: 0px !important;
    }
  }

  @media (max-width: 420px){
    nav {
      padding: 0px !important;
    }
  }
</style>
