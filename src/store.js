import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	login: false,
  	words: [
  		["word", "meaning"]
  	]
  },
  getters: {
  	allWords(state){
  		return state.words
  	},
  	lastWord(state){
  		alert(state.words);
  		return state.words[state.words.length-1]
  	}
  },
  mutations: {
  	login(state){
  		state.login = true;
  	},
  	addEmptyWord(state){
  		alert("addEmptyWord");
  		state.words.push(["",""]);
  	}
  },
  actions: {

  }
})
