<template>
  <div id="words">
  	<h1>Language Select for TTS Audio</h1>
  	<div id="lang-container">
  		<div class="tts-lang" id="de" data-lang="de-de" @click="langCheck($event)"></div>
  		<div class="tts-lang" id="fi" data-lang="fi-fi" @click="langCheck($event)"></div>
  		<div class="tts-lang" id="fr" data-lang="fr-fr" @click="langCheck($event)"></div>
  		<div class="tts-lang" id="jp" data-lang="ja-jp" @click="langCheck($event)"></div>
  		<div class="tts-lang" id="nl" data-lang="nl-nl" @click="langCheck($event)"></div>
  		<div class="tts-lang" id="ru" data-lang="ru-ru" @click="langCheck($event)"></div>
  		<div class="tts-lang" id="us" data-lang="en-us" @click="langCheck($event)"></div>
  	</div>
    <md-table>
    	<md-table-row>
    		<md-table-head>Index</md-table-head>
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
			// Check for selected lang
			this.langCheck();

			// Check if List Has Empty Row if Not Add 
			let lastWord = this.$store.getters.lastWord;
			if (lastWord[0].length > 0 || lastWord[1].length > 0) {
				this.$store.commit("addEmptyWord");
			}
		},
		methods: {
			langCheck(e){
				// Update on click
				if (e) {
					let newLang = e.target.dataset["lang"];
					this.$store.commit("updateLang", newLang);
				}
				// Update Language Icons with Selected Class
				let lang = this.$store.getters.currentLang;
				if (lang.length > 0) {
					let icons = document.querySelectorAll(".tts-lang");
					for (var i = 0; i < icons.length; i++) {
						icons[i].dataset["lang"] == lang ? icons[i].classList.add("selectedLang") : icons[i].classList.remove("selectedLang");
					}
				}
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
	#lang-container {
		height: 100px;
		display: flex;
		max-width: 800px;
		margin: auto;
	}

	.tts-lang {
		width: 150px;
		height: 100px;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		margin: auto;
		transform: scale(0.8);
		opacity: 0.5;
		cursor: pointer;
		transition: 0.4s all;

		&:hover {
			opacity: 1;
		} 

		&.selectedLang {
			transform: scale(1.2);
			opacity: 1;
		}
	}

	#de {
		background-image: url("./../assets/flag-de.png");
	}

	#fi {
		background-image: url("./../assets/flag-fi.png");
	}

	#fr {
		background-image: url("./../assets/flag-fr.png")
	}

	#jp {
		background-image: url("./../assets/flag-ja-jp.png");		
	}

	#nl {
		background-image: url("./../assets/flag-nl.png");		
	}

	#ru {
		background-image: url("./../assets/flag-ru.png");		
	}

	#us {
		background-image: url("./../assets/flag-us.png");		
	}		

	h1 {
		padding-top: 80px;
		margin-top: 0px;
	}

	.md-table {
		max-width: 800px;
		max-height: 600px;
		
		margin: auto;
		background-color: #dfdfdf;
	}
</style>