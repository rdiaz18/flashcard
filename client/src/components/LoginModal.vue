<template>
  <div id="login">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">
          <span id="logo"></span>
          <span id="logo-text">TTS Flashcards</span>
        </div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Email</label>
          <md-input name="email" v-model="email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input name="password" v-model="password"></md-input>
        </md-field>
      </md-card-content>
      <md-button type="submit" class="md-primary" :disabled="sending" @click="register">Register</md-button>
      <md-button type="submit" class="md-primary" :disabled="sending" @click="login">Login</md-button>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  props: {
    msg: String
  },
  watch: {
    '$store.state.jwt'(val, oldVal){
      if (val != '' && oldVal == '') {
        this.$router.push({ name: "words" })
      }
    }
  },
  methods: {
    login(){
      this.$store.dispatch("login",
        { "email": this.email, "password": this.password }
      );
    },
    register(){
      this.$store.dispatch("register",
        { "email": this.email, "password": this.password }
      );      
    },
    alertEmpty(){
      if (this.email == "" || this.password == "") {
        alert("Please Complete Email and Password Fields");
      }
    }
  },
  data(){
    return {
      register: false,
      email: "",
      password: ""
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
  border: 1px solid black;

  .md-card-header {
    background-color: lightskyblue;
    border-bottom: 1px solid black;
  }

  .md-card {
    background-color: #fdfdfd;
    width: 600px;
    height: 400px;
  }
}
#logo {
  background-image: url("./../assets/volume.png");
  background-size: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  padding: 20px;
  border-radius: 50% 50% 50% 0%;
  display: inline-block;
  transform: rotate(-90deg);
  height: 30px;
  width: 30px;
  position: relative;
  border: 1px solid black;
}
#logo-text {
  top: -7px;
  left: -3px;
  background-color: white;
  padding-right: 8px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  position: relative;
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
</style>
