<template>
  <div id="login">
    <md-card class="md-layout-item">
      <md-card-header>
        <div class="md-title">TTS Flashcards</div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Email</label>
          <md-input name="email"></md-input>
        </md-field>
        <md-field>
          <label>Password</label>
          <md-input name="password"></md-input>
        </md-field>
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending" @click="login">Login</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
  methods: {
    login(){
      this.$store.commit("login");
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

  .md-card {
    background-color: #fdfdfd;
    width: 600px;
    height: 400px;
  }
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
