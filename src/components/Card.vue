<template>
	<div class="flashcardContainer">
		<div id="soundIcon" @click="playTTS"></div>
		<div id="flashcard">
			<h1>{{ $store.state.words[$store.state.currentWord][0] }}</h1>
		</div>
		<div id="flashcardControls">
			<input type="text" name="meaningInput" placeholder="Enter Meaning" v-model="cardInput">
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
	            console.log(newVal);
	            store.dispatch('handleMyStateChange');
	        }
		},
		methods: {
			checkSubmission(){
				if (this.$store.getters.currentMeaning == this.cardInput) {
					this.$store.commit("addCorrect")
				} else {
					this.$store.commit("addIncorrect");
				}
			},
			skipWord(){
				this.$store.commit("addSkip");
			},
			playTTS(){

				var xhr = new XMLHttpRequest(),
					audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
					source = audioCtx.createBufferSource();

				xhr.open('GET', `http://api.voicerss.org/?key=ad3a12d9c8d6452191ce16c63f9114cd&hl=ru-ru&f=8khz_16bit_stereo&src=${this.$store.getters.currentWord}`, true);
				xhr.responseType = 'arraybuffer';

				xhr.onload = function(){
					var audioData = xhr.response;

					audioCtx.decodeAudioData(audioData, function(buffer) {
				        let myBuffer = buffer,
				        	songLength = buffer.duration;

				        source.buffer = myBuffer;
				        source.connect(audioCtx.destination);
				        source.loop = false;
				        source.start(0);	
				    })
				}

				xhr.send();
  			}

		},
		data(){
			return {
				cardInput: ""
			}
		}
	}
</script>

<style scoped lang="scss">
	.flashcardContainer {
		height: 300px;
		width: 400px;
		margin: auto;

		#flashcard {
			background-color: #fdfdfd;
			padding: 20px;
			height: 100%;
			width: 100%;
			margin: auto;
			position: relative;

			h1 {
				font-size: 3em;
				top: 50%;
				transform: translateY(-50%);
				position: relative;
				margin: 0 auto;
			}

		}

		#flashcardControls {
			margin-top: 50px;

			input {
				width: 100%;
				height: 50px;
				padding-left: 5px;
				margin: auto;
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