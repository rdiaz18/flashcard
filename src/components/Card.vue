<template>
	<div class="flashcardContainer">
		<div id="info-wrap">
			<div>
				<md-field>
					<label>Word List</label>
					<md-select id="list-select" v-model="currentList" @change="changeList(e.target.value)">
			  			<md-option v-for="(list, index) in $store.getters.wordLists" :value="list.title">{{ list.title }}</md-option>
			  		</md-select>
				</md-field>
			</div>
			<div id="control-wrap">
				<!-- <h1 id="incorrect">- {{ $store.getters.incorrectCount }}</h1> -->
				<div id="soundIcon" @click="playTTS"></div>
				<!-- <h1 id="correct">+ {{ $store.getters.correctCount }}</h1> -->
			</div>
		</div>
		<div id="flashcard">
			<h1>{{ $store.getters.currentWord }}</h1>
			<h2>{{ cardAnswer }}</h2>
		</div>
		<div id="flashcardControls">
			<input type="text" name="meaningInput" placeholder="Enter Meaning" v-model="cardInput" @keyup.enter="checkSubmission">
			<md-button @click="skipWord">Skip</md-button>
			<md-button @click="checkSubmission">Check</md-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Card",
		watch: {
			'$store.state.currentWord': function (newVal) {
				let that = this;
	            setTimeout(function(){ that.playTTS() }, 3000);
	        }
		},
		mounted(){
			// if (localStorage.getItem("currentList") == null) {
			// 	localStorage.setItem("currentList", null);
			// } else {
			// 	this.$store.commit("setCurrentList", localStorage.getItem("currentList"));
			// }

			// if (localStorage.getItem("currentListData") == null){
			// 	localStorage.setItem("currentListData", {
			// 		""
			// 	});
			// }

			// // Get or Create Correct in Local Storage -> Update Store
			// if (localStorage.getItem("correct") == null) {
			// 	localStorage.setItem("correct", 0);
			// } else {
			// 	this.$store.commit("setCorrect", parseInt(localStorage.getItem("correct")) );
			// }
			// // Get or Create Incorrect in Local Storage -> Update Store
			// if (localStorage.getItem("incorrect") == null) {
			// 	localStorage.setItem("incorrect", 0)
			// } else {
			// 	this.$store.commit("setIncorrect", parseInt(localStorage.getItem("incorrect")) );
			// }
			// // Get or Create Current Word in Local Storage -> Update Store
			// if (localStorage.getItem("currentWord") == null) {
			// 	localStorage.setItem("currentWord", 0);
			// } else {
			// 	this.$store.commit("setCurrentWord", parseInt(localStorage.getItem("currentWord")) )
			// }
		},
		methods: {
			checkSubmission(){
				var flashcard = document.getElementById("flashcard"),
					that = this,
					submission = this.cardInput.toLowerCase(),
					match = false,
					meaningArr = this.$store.getters.currentMeaning.toLowerCase().split(",");

				// Show Card Answer
				this.cardAnswer = this.$store.getters.currentMeaning;

				// Loop over possible matches in meaning
				match = meaningArr.find((e) => { return e == submission; });

				if (match) {
					// localStorage.setItem("correct", this.$store.getters.correctCount + 1);
					flashcard.classList.add("correct");
					setTimeout(function(){
						flashcard.classList.remove("correct");
						that.$store.commit("addCorrect");
						that.cardAnswer = "";
					}, 3000);
				} else {
					// localStorage.setItem("incorrect", this.$store.getters.incorrectCount + 1);
					flashcard.classList.add("incorrect");
					setTimeout(function(){					
						flashcard.classList.remove("incorrect");
						that.$store.commit("addIncorrect");
						that.cardAnswer = "";
					}, 3000);
				}

				// Empty Input
				this.cardInput = "";
				// Update Local Storage Current Word
				// localStorage.setItem("currentWord", this.$store.getters.currentWordCount);
			},
			changeList(payload){
				this.$store.commit("setCurrentList", payload);
				// Update Local Storage
				// localStorage.setItem("currentList", payload);
			},
			skipWord(){
				this.$store.commit("addSkip");
			},
			playTTS(){
				var xhr = new XMLHttpRequest(),
					audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
					source = audioCtx.createBufferSource();

				xhr.open('GET', `http://api.voicerss.org/?key=ad3a12d9c8d6452191ce16c63f9114cd&hl=${this.$store.getters.currentLang}&f=8khz_16bit_stereo&src=${this.$store.getters.currentWord}`, true);
				xhr.responseType = 'arraybuffer';

				xhr.onload = function(){
					var audioData = xhr.response;

					audioCtx.decodeAudioData(audioData, function(buffer) {
				        let myBuffer = buffer,
				        	songLength = buffer.duration,
				        	gainNode = audioCtx.createGain()

				        source.buffer = myBuffer;
						gainNode.gain.value = 2; // 10 %
						gainNode.connect(audioCtx.destination);
				        source.connect(gainNode);
				        source.loop = false;
				        source.start(0);	
				    })
				}

				xhr.send();
  			}

		},
		data(){
			return {
				cardInput: "",
				cardAnswer: "",
				currentList: this.$store.getters.currentListTitle
			}
		}
	}
</script>

<style>
	.md-menu-content.md-select-menu .md-list {
		background-color: white !important;
	}
	.md-menu.md-select .md-input {
		color: black;
	}
</style>

<style scoped lang="scss">

	.flashcardContainer {
		height: 300px;
		width: 500px;
		margin: auto;

		#info-wrap {
			display: block;
			color: white;
			
			div input {
				margin-bottom: 0px;
				color: white !important;
			}

			h1 {
				top: -50%;
				transform: translateY(50%);
			}

			#control-wrap {
				display: flex;
			}

		}

		#flashcard {
			background-color: #fdfdfd;
			padding: 20px;
			height: 100%;
			width: 100%;
			margin: auto;
			position: relative;
			-webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
	        -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
			box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);

			h1 {
				font-size: 3em;
				top: 50%;
				transform: translateY(-50%);
				position: relative;
				margin: 0 auto;
			}

			&.correct {
				animation: correct 1s;
			}

			&.incorrect {
				animation: incorrect 1s;
			}

			@keyframes correct {
				0% { 
					background: white;
					right: 0px; 
				}
				50% { 
					background: green;
					right: -50px; 
				}
				100% { 
					background: white;
					right: 0px; 
				}
			}

			@keyframes incorrect {
				0% { 
					background: white;
					left: 0px; 
				}
				50% { 
					background: red;
					left: -50px; 
				}
				100% { 
					background: white;
					left: 0px; 
				}
			}

		}

		#flashcardControls {
			margin-top: 50px;

			input {
				width: 100%;
				height: 50px;
				padding-left: 5px;
				margin: auto;
				border: none;
				-webkit-box-shadow: inset 0px 0px 10px 0px rgba(0,0,0,0.75);
                -moz-box-shadow: inset 0px 0px 10px 0px rgba(0,0,0,0.75);
				box-shadow: inset 0px 0px 10px 0px rgba(0,0,0,0.75);
			}

			button {
				margin: 30px;
				color: white;
				border: 1px solid white;
			}
		}
	}

	#soundIcon {
		background-image: url("./../assets/volume.png");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		height: 30px;
		width: 30px;
		position: relative;
		display: block;
		margin: 50px auto;
		opacity: 0.5;
		cursor: pointer;
	}
</style>