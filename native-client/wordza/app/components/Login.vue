<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">

        <Image src="~/assets/logo/logo-color.jpg" stretch="aspectFit" />

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" returnKeyPress="next" @returnPress="focusPassword" v-model="email" :isEnabled="!processing" />
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField class="input" ref="password" hint="Password" secure="true" :returnKeyType="isLoggingIn ? 'done' : 'next'" @returnPress="focusConfirmPassword" v-model="password" :isEnabled="!processing" />
          </StackLayout>

          <ActivityIndicator rowSpan="3" :busy="processing" />
        </GridLayout>  

        <FlexboxLayout justifyContent="center">
          <Button text="Register" @tap="register" dock="bottom" />
          <Button text="Login" @tap="login" dock="bottom" />   
        </FlexboxLayout>

      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
  watch: {
    '$store.state.jwt'(val, oldVal){
      if (val != '' && oldVal == '') {
        // if no wordlist go to words
        this.$goto('account');
        // else go to cards
        // this.$goto('cards');
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
<!-- <style scoped lang="scss">
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
 -->