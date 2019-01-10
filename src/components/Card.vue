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
		</div>
		<div id="flashcardInnerContainer">
			<div id="previous-flashcard" :class="{ hidden: $store.getters.previousWord == false }">
				<h1>{{ $store.getters.previousWord }}</h1>
				<h2>{{ $store.getters.previousMeaning }}</h2>
			</div>
			<div id="flashcard">
				<h1>{{ $store.getters.currentWord }}</h1>
				<h2>{{ cardAnswer }}</h2>
			</div>
			<div id="next-flashcard" :class="{ hidden: $store.getters.nextWord == false }">
				<h1>{{ $store.getters.nextWord }}</h1>
				<h2></h2>
			</div>
		</div>
		<div id="flashcardControls">
			<input type="text" name="meaningInput" placeholder="Enter Meaning" v-model="cardInput" @keyup.enter="checkSubmission">
	<!-- 		<md-button @click="skipWord">Skip</md-button> -->
			<div id="control-wrap">
				<div id="soundIcon" @click="playTTS"></div>
				<md-button @click="checkSubmission">Check</md-button>
				<div id="microphone" :class="{ green: speechMatch }" @click="recordAudio"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Card",
		watch: {
			'$store.state.currentWord': function (newVal) {
				let that = this;
	            setTimeout(function(){ that.playTTS() }, 500);
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
			recordAudio(){

				// Reset Match Status
				this.speechMatch = null;

				window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

				var that = this,
					recognition = new SpeechRecognition();
					// grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;',
					// speechRecognitionList = new SpeechGrammarList();

				// speechRecognitionList.addFromString(grammar, 1);
				// recognition.grammars = speechRecognitionList;
				//recognition.continuous = false;
				recognition.lang = this.$store.getters.currentLang;
				recognition.interimResults = false;
				recognition.maxAlternatives = 1;
				recognition.start();

				recognition.onresult = function(event) {
				  var word = event.results[0][0].transcript;
				  console.log(event.results);
				  if (word == that.getters.currentWord) {
				  	that.speechMatch = true;
				  } else {
				  	that.speechMatch = false;
				  }
				}
			},
			playTTS(){

				let utterance = new SpeechSynthesisUtterance(this.$store.getters.currentWord);
				
				utterance.lang = this.$store.getters.currentLang;
				speechSynthesis.speak(utterance);

				// var xhr = new XMLHttpRequest(),
				// 	audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
				// 	source = audioCtx.createBufferSource();

				// xhr.open('GET', `http://api.voicerss.org/?key=ad3a12d9c8d6452191ce16c63f9114cd&hl=${this.$store.getters.currentLang}&f=8khz_16bit_stereo&src=${this.$store.getters.currentWord}`, true);
				// xhr.responseType = 'arraybuffer';

				// xhr.onload = function(){
				// 	var audioData = xhr.response;

				// 	audioCtx.decodeAudioData(audioData, function(buffer) {
				//         let myBuffer = buffer,
				//         	songLength = buffer.duration,
				//         	gainNode = audioCtx.createGain()

				//         source.buffer = myBuffer;
				// 		gainNode.gain.value = 2; // 10 %
				// 		gainNode.connect(audioCtx.destination);
				//         source.connect(gainNode);
				//         source.loop = false;
				//         source.start(0);	
				//     })
				// }

				// xhr.send();
  			}

		},
		data(){
			return {
				cardInput: "",
				cardAnswer: "",
				currentList: this.$store.getters.currentListTitle,
				speechMatch: null
			}
		}
	}
</script>

<style>
	.md-menu-content.md-select-menu .md-list,
	input#list-select {
		background-color: white !important;
	}
	.md-menu.md-select .md-input {
		color: black;
	}
</style>

<style scoped lang="scss">

	#flashcardInnerContainer {
		width: 80%;
		margin: auto;
		display: flex;
		height: 300px;
	}

	.flashcardContainer {
		height: 300px;
		width: 100%;
		margin: auto;

		#info-wrap {
			display: block;
			color: white;
			width: 500px;
			margin: auto;
			
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

		#flashcard,
		#previous-flashcard,
		#next-flashcard {
			background-color: #fdfdfd;
			padding: 20px;
			height: 100%;
			width: calc(100% / 3);
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

		#previous-flashcard,
		#next-flashcard {
			transform: scale(0.8);
			opacity: 0.8;
		}

		#flashcardControls {
			margin: auto;
			margin-top: 50px;
			width: 500px;

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
		}
	}

	.hidden {
		opacity: 0 !important;
	}

	#control-wrap {
		display: flex;
		margin-top: 40px;
		background-color: white;
		justify-content: space-between;

		.md-button {
			color: black;
			height: 48px;
			border: 1px solid black;
		}
	}

	#soundIcon, #microphone {
		height: 60px;
		width: 60px;
		cursor: pointer;
		background-size: 30px;
		background-repeat: no-repeat;
		background-position: center;
		opacity: 0.75;			
	}

	#soundIcon:hover, 
	#microphone:hover {
		opacity: 1;
	}

	#soundIcon {
		background-image: url("./../assets/volume.png");
	}

	#microphone {
		background-image: url('./../assets/microphone-icon.png');
	}

	#microphone.green {
		background-color: green;
	}
</style>