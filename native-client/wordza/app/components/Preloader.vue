<template>
  <AbsoluteLayout id="preloader">
    <ActivityIndicator :busy="active" />
    <Label :text="$store.getters.preloaderMsg" />
  </AbsoluteLayout>
</template>

<script>
	export default {
		name: "Preloader",
    props: {
      active: Boolean
    }
	}
</script>

<style scoped lang="scss">
  #preloader {
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    label {
      color: white;
      text-transform: uppercase;
      text-align: center;
    }
  }
</style>