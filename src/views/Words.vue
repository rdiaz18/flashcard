<template>
  <div id="words">
  	<h1>TTS Language</h1>
  	<div id="tts-lang"></div>
    <md-table>
    	<md-table-row>
    		<md-table-head>Word</md-table-head>
    		<md-table-head>Meaning</md-table-head>
    	</md-table-row>
    	<WordRow v-for="(word, index) in $store.getters.allWords" :index="index" :word="word[0]" :meaning="word[1]"></WordRow>
    </md-table>
  </div>
</template>

<script>
	import WordRow from "../components/WordRow.vue";
	export default {
		name: "Words",
		components: {
			WordRow
		},
		mounted(){
			// Check if List Has Empty Row if Not Add 
			let lastWord = this.$store.getters.lastWord;
			if (lastWord[0].length > 0 || lastWord[1].length > 0) {
				this.$store.commit("addEmptyWord");
			}
		},
		methods: {
			
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
	#tts-lang {
		width: 150px;
		height: 100px;
		background-image: url("./../assets/flag-ru.png");
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		margin: auto;
	}

	h1 {
		padding-top: 80px;
		margin-top: 0px;
	}

	.md-table {
		max-width: 800px;
		margin: auto;
		background-color: #dfdfdf;
	}
</style>