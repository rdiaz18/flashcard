<template>
  <Page actionBarHidden="true" id="parent" class="page">

      <StackLayout class="form" verticalAlignment="center" orientation="vertical">

        <Image src="~/assets/logo/logo-color.png" stretch="aspectFit" id="logo" class="whiteBg" />

        <GridLayout rows="auto, auto, auto">

          <StackLayout row="0" class="input-field">
            <TextField class="input whiteBg" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" returnKeyPress="next" @returnPress="focusPassword" v-model="email" :isEnabled="!processing" />
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField class="input whiteBg" ref="password" hint="Password" secure="true" :returnKeyType="isLoggingIn ? 'done' : 'next'" @returnPress="focusConfirmPassword" v-model="password" :isEnabled="!processing" />
          </StackLayout>

        </GridLayout>  

        <FlexboxLayout justifyContent="center" id="btnWrap">
          <Button text="Register" @tap="register" dock="bottom" class="btn" />
          <Button text="Login" @tap="login" dock="bottom" class="btn" />   
        </FlexboxLayout>

        <FlexboxLayout justifyContent="center">
          <Label text="Forgot Password?" @tap="forgotPassword" dock="bottom" id="forgotPassword" />  
        </FlexboxLayout>

      </StackLayout>

      <Preloader v-if="$store.getters.showPreloader" />
      <!-- <ModalController :PasswordResetModal="passwordResetModal" /> -->

  </Page>
</template>

<script>
  import Preloader from "../components/Preloader.vue";
  import ModalController from "../components/ModalController.vue";
  export default {
    name: 'Login',
    props: {
      msg: String
    },
    components: {
      Preloader,
      ModalController
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
          alert("Switching Routes");
          this.$goto('words'); 
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
      }
    },
    data(){
      return {
        email: "",
        password: "",
        passwordResetModal: false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .whiteBg {
    background-color: white;
  }

  .whiteColor {
    color: white;
  }

</style>

<style scoped>

#parent.page {
  background-image: url("~/assets/backgrounds/bg-ru-RU.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.form {
  padding: 45px;
  /*background-color: transparent;*/
  background-color: white;
}

#parent .btn {
  height: 80px;
}

#logo {
  padding: 30px 0px;
  margin-bottom: 30px;
  background-color: white;
}

#btnWrap {
  margin: 30px 0px;
}

button {
  background-color: white;
}

</style>
