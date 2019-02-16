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
    background-color: #2799f9;
  }

  .md-card {
    background-color: #fdfdfd;
    width: 600px;
    height: 400px;
  }

  .md-button {
    background-color: white;
  }
}
#logo {
  background-image: url("./../assets/logo/logo-color.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  padding: 20px;
  display: inline-block;
  height: 211.5px;
  width: 396px;
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
