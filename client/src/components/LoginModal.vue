<template>
  <div id="login">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">
          <span id="logo"></span>
        </div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Email</label>
          <md-input name="email" v-model="email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input name="password" v-model="password" @keyup.enter="login"></md-input>
        </md-field>
        <md-field>
          <label>Menu Language</label>
          <md-select id="list-select" v-model="menuLanguageCode" @input="onChangeMenuLanguage">
            <md-option v-for="(list, index) in languagesArr" :key="index" :value="list[1]">
              {{list[0]}}
            </md-option>
          </md-select>
        </md-field>
      </md-card-content>
    </md-card>
    <br />
    <md-button type="submit" class="md-primary" @click="register">Register</md-button>
    <md-button type="submit" class="md-primary" @click="login">Login</md-button>
    <p id="forgotPassword" @click="forgotPassword">Forgot Password?</p>
    <ModalController :PasswordResetModal="passwordResetModal" v-if="$store.state.showModal == true" />
  </div>
</template>

<script>
import ModalController from "../components/ModalController";
import {mapGetters} from 'vuex';

export default {
  name: 'LoginModal',
  components: {
    ModalController
  },
  computed: {
    ...mapGetters({
      languageCategories: 'languageCategories',
      languagesArr: 'languagesArr',
      currentMenuLanguage: 'currentMenuLanguage'
    })
  },
  watch: {
    '$store.state.jwt'(val, oldVal){
      if (val != '' && oldVal == '') {
        // Get Lists
        this.$store.dispatch("getStockWordList");
        this.$store.dispatch("getListByUser");
      }
    },
    '$store.state.wordListsLoaded'(val, oldVal){
      if (val === 2){
        this.$router.push({ name: "words" })
      }
    }
  },
  methods: {
    login(){
      this.emptyCheck("login");
    },
    register(){
      this.emptyCheck("register");  
    },
    emptyCheck(loginType){
      if (this.email == "" || this.password == "") {
        alert("Please Complete Email and Password Fields");
      } else {
        this.$store.commit("setPreloader", true);

        let obj = { "email": this.email, "password": this.password };
        if (loginType == "login") {
          this.$store.commit("setPreloaderMsg", "Verifying Credentials");
          this.$store.dispatch("login", obj); 
        } else { 
          this.$store.commit("setPreloaderMsg", "Registering Credentials");
          this.$store.dispatch("register", obj);
        }
      }
    },
    forgotPassword(){
      this.passwordResetModal = true;
      this.$store.commit("setModal", true);
    },
    onChangeMenuLanguage(){
      var that = this;
      console.log(that.menuLanguageCode)
      window.localStorage.setItem("menuLanguageCode", this.menuLanguageCode)
      this.$store.commit("setMenuLanguage", this.menuLanguageCode)
    }
  },
  beforeMount(){
    if (window.localStorage.getItem("menuLanguageCode")) {
      this.menuLanguageCode = window.localStorage.getItem("menuLanguageCode");
      this.$store.commit("setMenuLanguage", this.menuLanguageCode);
    }
  },
  data(){
    return {
      email: "",
      password: "",
      passwordResetModal: false,
      menuLanguage: null,
      menuLanguageCode: null,
      menuLanguageIndex: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#login {
  margin: auto;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
  position: fixed;
  border: 0px solid #2799f9;

  .md-card-header {
    background-color: white;
  }

  .md-card {
    background-color: #fdfdfd;
    width: 600px;
    height: auto;
  }

  .md-card-content {
    padding: 30px;
    margin-top: -50px !important;
  }

  .md-button {
    background-color: white;
  }
}
#logo {
  background-image: url("./../assets/logo/logo-color.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top;
  background-color: white;
  padding: 20px;
  display: inline-block;
  height: 211.5px;
  width: 100%;
  position: relative;
  border-bottom: 0px solid #2799f9;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#forgotPassword {
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
