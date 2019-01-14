<template>
  <div id="words">
  	<div id="lang-container">
  		<div id="lang-inner-container">

  			<div class="lang-select">
				<h1>I Learn <span id="flag-container" :style="{ backgroundImage: `url(${src})` }"></span></h1>
				<hr>
	  			<md-field id="select-container">
		  		<!-- 	<label>Select Language</label> -->
			  		<select v-model="country" @change="changeLang">
			  			<optgroup v-for="(category, index) in $store.getters.languageCategories" :label="category">
			  				<option v-for="(lang, i) in $store.state.languages[category]" :value="lang[1]" :data-category="category" class="lang-flag">
			  					{{ lang[0] }}
			  				</option>
			  			</optgroup>
			  		</select>
			  	</md-field>
			</div>

  			<div class="lang-select">
  				<h1>I Know <span id="flag-container" :style="{ backgroundImage: `url(${src})` }"></span></h1>
  				<hr>
	  			<md-field id="select-container">
		  		<!-- 	<label>Select Language</label> -->
			  		<select v-model="country" @change="changeLang">
			  			<optgroup v-for="(category, index) in $store.getters.languageCategories" :label="category">
			  				<option v-for="(lang, i) in $store.state.languages[category]" :value="lang[1]" :data-category="category" class="lang-flag">
			  					{{ lang[0] }}
			  				</option>
			  			</optgroup>
			  		</select>
			  	</md-field>
			</div>

	  	</div>
  	</div>

  	<div id="list-select-container">
  		<hr>
  		<h1>Word List Select</h1>
  		<hr>
  		<div v-show="$store.getters.ttsExpiry != 'Not Purchased'">
	  		<md-field>
	  			<label>New List Name</label>
	  			<md-input v-model="newListName"></md-input>
	  		</md-field>
	  		<md-button @click="createNewList">Create New List</md-button>
	  	</div>
	  	<div :class="{ center: centerIt }">
	  		<md-field>
	  			<label style="margin-left: 5px">Word List</label>
	  			<md-select id="list-select" v-model="currentList">
		  			<md-option v-for="(list, index) in $store.getters.wordLists" :value="list.title">{{ list.title }}</md-option>
		  		</md-select>
	  		</md-field>
	  		<md-field v-show="newListCheck == true && $store.getters.ttsExpiry != 'Not Purchased'">
	  			<label>New List Name</label>
	  			<md-input></md-input>
	  		</md-field>
	  		<md-button @click="deleteList" v-show="$store.getters.ttsExpiry != 'Not Purchased'">Delete List</md-button>
	  		<md-button @click="saveList">Save List</md-button>
	  	</div>
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
		beforeMount(){
			var that = this;
			function importAll (r) {
			  r.keys().forEach(key => that.imgCache[key] = r(key));
			}

			importAll(require.context('../assets/flags/', true, /\.png$/));
		},
		mounted(){
			// Check for selected lang
			// this.langCheck();

			// Check if List Has Empty Row if Not Add 
			let lastWord = this.$store.getters.lastWord;
			if (lastWord[0].length > 0 || lastWord[1].length > 0) {
				this.$store.commit("addEmptyWord");
			}
		},
		computed: {
			src(){
				var key = `./flag-${this.country}.png`,
					url = this.imgCache[key];

				return url;
			}
		},
		methods: {
			// langCheck(e){
			// 	// Update on click
			// 	if (e) {
			// 		let newLang = e.target.dataset["lang"];
			// 		this.$store.commit("updateLang", newLang);
			// 	}
			// 	// Update Language Icons with Selected Class
			// 	// let lang = this.$store.getters.currentLang;
			// 	// if (lang.length > 0) {
			// 	// 	let icons = document.querySelectorAll(".tts-lang");
			// 	// 	for (var i = 0; i < icons.length; i++) {
			// 	// 		icons[i].dataset["lang"] == lang ? icons[i].classList.add("selectedLang") : icons[i].classList.remove("selectedLang");
			// 	// 	}
			// 	// }
			// },
			newListCheck(){
				// If Make New List Selected
				return this.currentList == "newList" ? true : false;
			},
			createNewList(){
				if (this.newListName.length > 0){
					this.$store.commit("addList", this.newListName);
					this.newListName = '';
				} else {
					alert("Please Add List Title");
				}
			},
			saveList(){
				// this.$store.dispatch("saveList");
			},
			deleteList(){
				// this.$store.dispatch("deleteList");
			},
			changeLang(){
				var that = this;
				console.log(that.country);
				this.$store.commit("updateLang", this.country);
			}
		},
		data() {
			return {
				currentList: this.$store.getters.currentListTitle,
				newListName: '',
				centerIt: this.$store.getters.ttsExpiry == "Not Purchased" ? true : false,
				country: this.$store.getters.currentLang,
				imgCache: {}
			}
		}
	}
</script>

<style lang="scss">
	#words { 
		h1 {
			color: black;
		}

		.md-menu.md-select {
			background-color: white;
		}

		.md-field {
			min-height: 30px;
		}
	}

	#lang-container {

		background-color: lightgray;
		display: block;

		#lang-inner-container {
			width: 100%;
			display: flex;
		}

		.lang-select {
			width: calc(100% / 2);

			h1 {
				padding-right: 25px;
			}
		}

		#flag-container {
			width: 100px;
			height: 50px;
			position: absolute;
			top: calc(50% - 45px);
			border-right: 1px solid lightgray;
			background-position: center;
			background-repeat: no-repeat;
			background-size: contain;
		}

		#select-container {
			width: 100%;
			margin: 0px;
			padding: 0px;
			display: block;

			select {
				margin: auto;
				width: 100%;
				border: 0px;
				cursor: pointer;
				height: 32px;
			}

			select, label {
				padding: 0px 0px 0px 20px;
			}

			label {
				position: relative;
				left: initial;
				top: initial;
			}
		}
	}

	#lang-container,
	#list-select-container {
		max-width: 800px;
		margin: auto;
		position: relative;
	}

	#list-select-container {
		background-color: lightgray;
		border-bottom: 1px solid black;

		& div {
			width: 50%;
		}

		& div:first-of-type {
			border-right: 5px solid lightgray;
		}

		& div:last-of-type {
			border-left: 5px solid lightgray;
		}

		& div div {
			width: 100%;
		}
	}

	#list-select {
		padding: 5px !important;
		background-color: white !important;
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

	.lang-flag {
		background-size: 30px;
		background-repeat: no-repeat;
		background-position: 30px;
		padding-left: 30px;
	}		

	h1 {
		padding-top: 20px;
		margin-top: 0px;
	}

	.md-table {
		max-width: 800px;
		max-height: 600px;
		
		margin: auto;
		background-color: #dfdfdf;
	}

	.md-field {
		margin: 4px 0px 0px;
	}

	.md-list, .md-input {
		background-color: white !important;
	}

	.md-input, input {
		padding: 5px !important;
		font-size: 1.8em;
	}

	.md-button:hover {
		background-color: lightgray !important;
	}

	.center {
		margin: auto;
		display: flex;
		margin-bottom: 15px;
		width: auto !important;

		button {
			top: 12px;
		}
	}
</style>