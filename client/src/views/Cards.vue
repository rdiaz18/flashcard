<template>
  <div id="home">

    <div id="cards">
    	<Card />
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue';

export default {
  name: 'Cards',
  components: {
    Card
  },
  mounted(){
	// Remove Preloader
	this.$store.commit("setPreloader", false);
  }
}
</script>
