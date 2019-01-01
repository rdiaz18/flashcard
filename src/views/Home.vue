<template>
  <div id="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Login v-if="$store.state.login == false" />
    <div id="cards">
    	<Card />
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue';
import Card from '@/components/Card.vue';

export default {
  name: 'Home',
  components: {
    Login,
    Card
  }
}
</script>
