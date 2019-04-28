<template>
  <div class="flashcardContainer">
    <div id="info-wrap">
      <div>
        <!-- {{ $store.getters.wordLists }} -->
        <md-field>
          <label>Word List</label>
          <md-select id="list-select" v-model="currentListID" @input="onChangeCurrentList" placeholder="Select Word List">
            <md-option v-for="(list, index) in $store.getters.wordLists" :key="index" :value="list.id">{{ list.name }}
            </md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div id="flashcardInnerContainer">
      <div id="previous-flashcard" :class="{ hidden: $store.getters.previousWord === undefined }">
        <h2>{{ $store.getters.previousMeaning }}</h2>
        <h1>{{ $store.getters.previousWord }}</h1>
      </div>
      <div id="flashcard">
        <h2 id="speechWord" :style="{ color: speechColor }">{{ speechWord }}</h2>
        <h2>{{ cardAnswer }}</h2>
        <h1>{{ $store.getters.currentWord }}</h1>
      </div>
      <div id="next-flashcard" :class="{ hidden: $store.getters.nextWord === undefined }">
        <h2></h2>
        <h1>{{ $store.getters.nextWord }}</h1>
      </div>
    </div>
    <div id="flashcardControls">
      <input type="text" name="meaningInput" placeholder="Enter Meaning" v-model="cardInput"
             @keyup.enter="checkSubmission">
      <!-- 		<md-button @click="skipWord">Skip</md-button> -->
      <div id="control-wrap">
        <div id="soundIcon" @click="playTTS"></div>
        <md-button @click="checkSubmission">Check</md-button>
        <div id="microphone" @click="recordAudio" v-show="recording === false"></div>
        <div id="microphone-stop" @click="stopRecord" v-show="recording === true"></div>
      </div>
    </div>
    <audio id="correctSound" nocontrols hidden>
      <source src="../assets/sounds/correct-beep.wav" type="audio/wav">
    </audio>
    <audio id="incorrectSound" nocontrols hidden>
      <source src="../assets/sounds/incorrect-beep.wav" type="audio/wav">
    </audio>
  </div>
</template>

<script>
  export default {
    name: "Card",
    watch: {
      '$store.state.currentWord'(newVal) {
        let that = this;
        setTimeout(function () {
          that.playTTS();
        }, 500);
      },
      currentList(val) {
        this.$store.commit("setCurrentList", this.$store.getters.wordLists.filter((v) => v.id === val));
      }
    },
    computed: {
      speechColor() {
        if (this.speechWord !== "...") {
          return this.speechWord.toLowerCase() === this.$store.getters.currentWord ? "green" : "red"
        }
      }
    },
    mounted () {
      this.currentListID = this.currentList ? this.currentList.id : null;
    },
    methods: {
      onChangeCurrentList(item) {
        if (item) {
          let list = this.$store.getters.wordLists.find((v) => v.id === item);
          this.$store.commit("setCurrentList", list);
        }
      },
      checkSubmission() {
        var flashcard = document.getElementById("flashcard"),
          that = this,
          submission = this.cardInput.toLowerCase(),
          match = false,
          meaningArr = this.$store.getters.currentMeaning.toLowerCase().split(", ");

        // Show Card Answer
        this.cardAnswer = this.$store.getters.currentMeaning;

        // Loop over possible matches in meaning
        match = meaningArr.find((e) => {
          return e === submission;
        });

        if (match) {
          // localStorage.setItem("correct", this.$store.getters.correctCount + 1);
          flashcard.classList.add("correct");
          that.playCorrectBeep();
          setTimeout(function () {
            flashcard.classList.remove("correct");
            that.$store.commit("addCorrect");
            that.cardAnswer = "";
            that.speechWord = "";
          }, 3000);
        } else {
          // localStorage.setItem("incorrect", this.$store.getters.incorrectCount + 1);
          flashcard.classList.add("incorrect");
          that.playIncorrectBeep();
          setTimeout(function () {
            flashcard.classList.remove("incorrect");
            that.$store.commit("addIncorrect");
            that.cardAnswer = "";
            that.speechWord = "";
          }, 3000);
        }

        // Empty Input
        this.cardInput = "";
        // Update Local Storage Current Word
        // localStorage.setItem("currentWord", this.$store.getters.currentWordCount);
      },
      // changeList(payload){
      // 	console.log(payload);
      // 	this.$store.commit("setCurrentList", payload);
      // },
      skipWord() {
        this.$store.commit("addSkip");
      },
      recordAudio() {
        // Reset Match Status
        this.recording = true;
        this.speechMatch = null;
        this.speechWord = "...";

        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

        this.recognition = new SpeechRecognition();
        this.recognition.lang = this.$store.getters.currentLang;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.start();

        var that = this;

        console.log(that.recognition);

        this.recognition.onresult = function (event) {
          var word = event.results[0][0].transcript;
          that.speechWord = word;
          that.recording = false;

          if (word === that.$store.getters.currentWord) {
            that.speechMatch = true;
            that.playCorrectBeep();
          } else {
            that.speechMatch = false;
            that.playIncorrectBeep();
          }
        }
      },
      stopRecord() {
        this.recording = false;
        this.recognition.stop();
      },
      playTTS() {
        let utterance = new SpeechSynthesisUtterance(this.$store.getters.currentWord);
        utterance.lang = this.$store.getters.currentLang;
        utterance.voice = speechSynthesis.getVoices()[18];
        speechSynthesis.speak(utterance);
      },
      playCorrectBeep() {
        document.querySelector("#correctSound").play();
      },
      playIncorrectBeep() {
        document.querySelector("#incorrectSound").play();
      }

    },
    data() {
      return {
        currentListID: null,
        cardInput: "",
        cardAnswer: "",
        currentList: this.$store.getters.currentList,
        speechMatch: null,
        speechWord: "",
        recognition: null,
        recording: false,
        audioSrc: ""
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

      .md-menu.md-select {
        background-color: white;
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
      -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
      display: flex;
      flex-flow: column;
      flex-direction: column;

      h1 {
        font-size: 3em;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        margin: 0 auto;
        background-color: transparent !important;
        color: black !important;
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
        -webkit-box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
        box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
      }
    }
  }

  #speechWord {
    position: absolute;
    width: calc(100% - 40px);
    bottom: 20px;
  }

  .hidden {
    opacity: 0 !important;
  }

  #control-wrap {
    display: flex;
    margin-top: 40px;
    background-color: #2799f9;
    justify-content: space-between;

    .md-button {
      color: black;
      height: 48px;
      background-color: white;
    }
  }

  #soundIcon, #microphone, #microphone-stop {
    height: 60px;
    width: 60px;
    cursor: pointer;
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 1;
    transition: 0.4s all;
  }

  #soundIcon:hover,
  #microphone:hover,
  #microphone-stop:hover {
    opacity: 1;
    transform: scale(1.1);

  }

  #soundIcon {
    background-image: url("./../assets/white-volume.png");
  }

  #microphone {
    background-image: url('./../assets/white-microphone-icon.png');
  }

  #microphone-stop {
    background-image: url('./../assets/white-microphone-stop-icon.png');
  }

  #microphone.green {
    background-color: green;
  }

  @media (max-width: 1023px) {

    #flashcardInnerContainer {
      width: 100% !important;
      top: 50%;
      transform: translateY(-50%);
      position: fixed;
      display: flex !important;
      height: auto !important;
    }

    #flashcardControls {
      width: 100% !important;
      position: fixed;
      bottom: 0;

      #control-wrap {
        margin-top: 0px !important;
        padding: 25px;
      }
    }

  }

  @media (max-width: 1023px) and (orientation: portrait) {

    #flashcardInnerContainer {
      display: block !important;
    }

    #previous-flashcard,
    #flashcard,
    #next-flashcard {
      width: 100% !important;
      height: 200px !important;
    }

    #previous-flashcard,
    #next-flashcard {
      opacity: 0.5;
    }

    #flashcard {
      transform: scale(0.8);

      h2 {
        font-size: 2em;
      }
    }

    .flashcardContainer #info-wrap {
      width: 80% !important;
    }

  }

  @media (max-width: 850px) and (orientation: landscape) {
    #flashcardControls #control-wrap {
      padding: 0px 30% !important;
    }

    #previous-flashcard,
    #flashcard,
    #next-flashcard {
      padding: 0px !important;
      height: 170px !important;
    }

    #flashcard h1,
    #flashcard h2 {
      width: 100% !important;
    }

    input[name="meaningInput"] {
      text-align: center;
    }
  }

  @media (max-width: 640px) and (orientation: landscape) {
    #soundIcon,
    #microphone,
    #microphone-stop {
      height: 47px !important;
    }

    #control-wrap .md-button {
      height: 36px !important;
    }

    .flashcardContainer #info-wrap {
      margin-top: -30px !important;
    }

    #flashcardInnerContainer {
      top: 48% !important;
    }

    .flashcardContainer #flashcard h1,
    .flashcardContainer #previous-flashcard h1,
    .flashcardContainer #next-flashcard h1 {
      font-size: 2.2em !important;
    }

    .flashcardContainer #flashcard h2,
    .flashcardContainer #previous-flashcard h2,
    .flashcardContainer #next-flashcard h2 {
      font-size: 1.2em !important;
    }
  }

  @media (max-width: 420px) {
    #flashcardInnerContainer {
      top: 47% !important;
    }

    #previous-flashcard,
    #flashcard,
    #next-flashcard {
      padding: 0px !important;
      width: 80% !important;
      transform: none !important;
      height: 165px !important;
      margin-bottom: 10px !important;
    }
  }

  @media (max-width: 380px) {
    #control-wrap {
      padding: 10px !important;
    }

    #next-flashcard {
      display: none !important;
    }
  }
</style>
