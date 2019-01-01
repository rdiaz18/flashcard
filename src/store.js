import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	login: false,
  	currentWord: 0,
  	correct: 0,
  	incorrect: 0,
  	skipped: 0,
  	words: [
  		["большой", "meaning"]
  	]
  },
  getters: {
  	allWords(state){
  		return state.words
  	},
  	currentWord(state){
  		return state.words[state.currentWord][0]
  	},
  	currentMeaning(state){
  		return state.words[state.currentWord][1]
  	},
  	lastWord(state){
  		return state.words[state.words.length-1]
  	},
  	duplicateEmptyCheck(state){
  		if (state.words.length >= 2) {
  			if (state.words[state.words.length-2][0] == 0 
  				|| state.words[state.words.length-2][1] == 0) {
				return true;
			}
  		} else {
  			return false;
  		}
  	}
  },
  mutations: {
  	login(state){
  		state.login = true;
  	},
  	addEmptyWord(state){
  		state.words.push(["",""]);
  	},
  	updateWord(state, payload){
  		console.log(payload);
  		// Index, Word, Meaning
  		state.words[payload["index"]][0] = payload["word"];
  		state.words[payload["index"]][1] = payload["meaning"];
  	},
  	addCorrect(state){
  		state.correct++;
  		state.currentWord++;
  	},
  	addIncorrect(state){
  		state.incorrect++;
  		state.currentWord++;
  	},
  	addSkip(state){
  		state.skipped++;
  		state.currentWord++;
  	}
  	// removeLastWord(state){
  	// 	state.words.pop();
  	// }
  },
  actions: {
  	
  }
})
