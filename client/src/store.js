import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
     apiKeys: {
      google: "",
      yandex: "trnsl.1.1.20190114T000445Z.95291844b30dc809.79341b7169f080deb7cfa0ce4eb4a65e7897cf3a"
     },
     jwt: '',
     user: null,
     showPreloader: false,
     showModal: false,
     preloaderMsg: "Loading",
     email: "mpaccione1991@gmail.com",
     password: "rspaccio",
     // ttsExpiry: "Purchased",// "Not Purchased",
     currentWord: 0,
     correct: 0,
     incorrect: 0,
     skipped: 0,
     currentList: [],
     tempList: [],
     language: "ru-RU",
     nativeLanguage: "en-US",
     languages: {
       "Afrikaans": [ // 1000 to EN DONE
         ["South Africa", "af-ZA"]
       ],
       "Arabic" : [ // 1000 to EN DONE
         ["Algeria","ar-DZ"],
         ["Bahrain","ar-BH"],
         ["Egypt","ar-EG"],
         ["Israel","ar-IL"],
         ["Iraq","ar-IQ"],
         ["Jordan","ar-JO"],
         ["Kuwait","ar-KW"],
         ["Lebanon","ar-LB"],
         ["Morocco","ar-MA"],
         ["Oman","ar-OM"],
         ["Palestinian Territory","ar-PS"],
         ["Qatar","ar-QA"],
         ["Saudi Arabia","ar-SA"],
         ["Tunisia","ar-TN"],
         ["UAE","ar-AE"]
       ],
       "Basque": [ // 1000 to EN DONE
         ["Spain", "eu-ES"]
       ],
       "Bulgarian": [ // 1000 to EN DONE
         ["Bulgaria", "bg-BG"]
       ],
       "Catalan": [ // 1000 to EN DONE
         ["Spain", "ca-ES"]
       ],
       "Chinese Mandarin": [ // 1000 to EN DONE
         ["China (Simp.)", "cmn-Hans-CN"],
         ["Hong Kong SAR (Trad.)", "cmn-Hans-HK"],
         ["Taiwan (Trad.)", "cmn-Hant-TW"]
       ],
       "Chinese Cantonese": [
         ["Hong Kong", "yue-Hant-HK"]
       ],
       "Croatian": [ // 1000 to EN DONE
         ["Croatia", "hr_HR"]
       ],
       "Czech": [ // 1000 to EN DONE
         ["Czech Republic", "cs-CZ"]
       ],
       "Danish": [ // 1000 to EN DONE
         ["Denmark", "da-DK"]
       ],
       "English": [
         ["Australia", "en-AU"],
         ["Canada", "en-CA"],
         ["India", "en-IN"],
         ["Ireland", "en-IE"],
         ["New Zealand", "en-NZ"],
         ["Philippines", "en-PH"],
         ["South Africa", "en-ZA"],
         ["United Kingdom", "en-GB"],
         ["United States", "en-US"]
       ],
       "Farsi": [ // 1000 to EN DONE
         ["Iran", "fa-IR"]
       ],
       "French": [ // 1000 to EN DONE
         ["France", "fr-FR"]
       ],
       "Filipino": [ // 1000 to EN DONE
         ["Philippines", "fil-PH"]
       ],
       "Finnish": [ // 1000 to EN DONE
         ["Finland", "fi-FI"]
       ],
       "Galician": [ // 1000 to EN DONE
         ["Spain", "gl-ES"]
       ],
       "German": [ // 1000 to EN DONE
         ["Germany", "de-DE"]
       ],
       "Greek": [ // 1000 to EN DONE
         ["Greece", "el-GR"]
       ],
       "Hebrew" :[ // 1000 to EN DONE
         ["Israel", "he-IL"]
       ],
       "Hindi": [ // 1000 to EN DONE
         ["India", "hi-IN"]
       ],
       "Hungarian": [ // 1000 to EN DONE
         ["Hungary", "hu-HU"]
       ],
       "Icelandic": [ // 1000 to EN DONE
         ["Iceland", "is-IS"]
       ],
       "Indonesian": [ // 1000 to EN DONE
         ["Indonesia", "id-ID"]
       ],
       "Italian": [ // 1000 to EN DONE
         ["Italy", "it-IT"],
         ["Switzerland", "it-CH"]
       ],
       "Japanese": [ // 1000 to EN DONE
         ["Japan", "ja-JP"]
       ],
       "Korean": [ // 1000 to EN DONE
         ["Korea", "ko-KR"]
       ],
       "Lithuanian": [ // 1000 to EN DONE
         ["Lithuania", "lt-LT"]
       ],
       "Malaysian": [ // 1000 to EN DONE
         ["Malaysia", "ms-MY"]
       ],
       "Dutch": [ // 1000 to EN DONE
         ["Netherlands", "nl-NL"]
       ],
       "Norwegian": [ // 1000 to EN DONE
         ["Norway", "nb-NO"]
       ],
       "Polish": [ // 1000 to EN DONE
         ["Poland", "pl-PL"]
       ],
       "Portuguese": [ // 1000 to EN DONE
         ["Brazil", "pt-BR"],
         ["Portugal", "pt-PT"]
       ],
       "Romanian": [ // 1000 to EN DONE
         ["Romania", "ro-RO"]
       ],
       "Russian": [ // 1000 to EN DONE
         ["Russia", "ru-RU"]
       ],
       "Serbian": [ // 1000 to EN DONE
         ["Serbia", "sr-RS"]
       ],
       "Slovak": [ // 1000 to EN DONE
         ["Slovakia", "sk-SK"]
       ],
       "Slovenian": [ // 1000 to EN DONE
         ["Slovenia", "sl-SI"]
       ],
       "Spanish": [ // 1000 to EN DONE
         ["Argentina", "es-AR"],
         ["Bolivia", "es-BO"],
         ["Chile", "es-CL"],
         ["Colombia", "es-CO"],
         ["Costa Rica", "es-CR"],
         ["Dominican Republic", "es-DO"],
         ["Ecuador", "es-EC"],
         ["El Salvador", "es-SV"],
         ["Guatemala", "es-GT"],
         ["Honduras", "es-HN"],
         ["México", "es-MX"],
         ["Nicaragua", "es-NI"],
         ["Panamá", "es-PA"],
         ["Paraguay", "es-PY"],
         ["Perú", "es-PE"],
         ["Puerto Rico", "es-PR"],
         ["Spain", "es-ES"],
         ["Uruguay", "es-UY"],
         ["United States", "es-US"],
         ["Venezuela", "es-VE"]
       ],
       "Swedish": [ // 1000 to EN DONE
         ["Sweden", "sv-SE"]
       ],
       "Thai": [ // 1000 to EN DONE
         ["Thailand", "th-TH"]
       ],
       "Turkish": [ // 1000 to EN DONE
         ["Turkey", "tr-TR"]
       ],
       "Ukrainian": [ // 1000 to EN DONE
         ["Ukraine", "uk-UA"]
       ],
       "Vietnamese": [ // 1000 to EN DONE
         ["Viet Nam", "vi-VN"]
       ],
       "Zulu": [ // 1000 to EN DONE
         ["South Africa", "zu-ZA"]
       ]
     },
     wordList: [],
     wordListsLoaded: 0
  },
  getters: {
    allWords(state){
      return state.currentList.words;
    },
    currentWordCount(state){
      return state.currentWord;
    },
    currentWord(state){
      if (state.currentList[0] != undefined) {
        return state.currentList[0].words[state.currentWord][0].trim();
      }
    },
    currentMeaning(state){
      if (state.currentList[0] != undefined) {
        return state.currentList[0].words[state.currentWord][1];
      }
    },
    previousWord(state){
        if (state.currentWord != 0) {
          return state.currentList[0].words[state.currentWord - 1][0];
        } else {
             return false;
        }
     },
     previousMeaning(state){
        if (state.currentWord != 0) {
          return state.currentList[0].words[state.currentWord - 1][1];
        } else {
          return false;
        }
     },
     nextWord(state){
        if (state.currentList[0] != undefined && state.currentWord != state.currentList[0].words.length) {
          return state.currentList[0].words[state.currentWord + 1][0];
        } else {
          return false;
        }
     },
     nextMeaning(state){
        if (state.currentList[0] != undefined && state.currentWord != state.currentList[0].words.length) {
          return state.currentList[0].words[state.currentWord + 1][1];
        } else {
          return false;
        }
     },
    duplicateEmptyCheck(state){
      if (state.currentList[0] != undefined && state.currentList.length >= 2) {
        if (state.currentList[0].words[state.currentList.length-2][0] == 0 || state.currentList[0].words[state.currentList.length-2][1] == 0) {
          return true;
        }
      } else {
        return false;
      }
    },
    languageCategories(state){
      let arr = [];
      for (var category in state.languages){
           arr.push(category);
      }
      return arr;
    },
    currentLang(state){
      return state.language;
    },
    currentNativeLang(state){
      return state.nativeLanguage;
    },
    correctCount(state){
      return state.correct;
    },
    incorrectCount(state){
      return state.incorrect;
    },
    wordLists(state){
      return state.wordList;
    },
    currentList(state){
      return state.currentList;
    },
    currentListWords(state){
      if (state.currentList.length != 0) {
        return state.currentList[0].words;
      } else {
        return [];
      }
    },
    email(state){
      return state.email;
    },
    password(state){
      return state.password;
    },
    // ttsExpiry(state){
    //     return state.ttsExpiry;
    // },
    getJWT(state){
      return state.jwt;
    },
    showPreloader(state){
      return state.showPreloader;
    },
    showModal(state){
      return state.showModal;
    }
  },
  mutations: {
    login(state){
      state.login = true;
    },
    setUser(state, payload){
      state.user = payload;
    },
    setPreloader(state, payload){
      state.showPreloader = payload;
    },
    setModal(state, payload){
      state.showModal = payload;
    },
    setPreloaderMsg(state, payload){
      state.preloaderMsg = payload;
    },
    setJWT(state, payload){
      state.jwt = payload;
    },
    addEmptyWord(state){
      for (var i = 0; i < state.wordLists.length; i++) {
        if (state.wordLists[i]["title"] == state.currentListTitle){
          state.wordLists[i]["words"].push(["",""]);
        }
      }
    },
    updateWord(state, payload){
      // Index, Word, Meaning
      state.tempList[payload["index"]][0] = payload["word"];
      state.tempList[payload["index"]][1] = payload["meaning"];
      state.currentList = state.tempList;
    },
    addCorrect(state){
      state.correct++;
      state.currentWord++;
    },
    addIncorrect(state){
      state.incorrect++;
      state.currentWord++;
    },
    setCorrect(state, payload){
      state.correct = payload;
    },
    setIncorrect(state, payload){
      state.incorrect = payload;
    },
    setCurrentWord(state, payload){
      state.currentWord = payload;
    },
    setCurrentList(state, payload){
      state.currentList = payload;
    },
    setTempList(state, payload){
      state.tempList = payload;
    },
    addSkip(state){
      state.skipped++;
      state.currentWord++;
    },
    updateLang(state, payload){
      state.language = payload;
    },
    updateNativeLang(state, payload){
      state.nativeLanguage = payload;
    },
    addList(state, payload){
      console.log("addList");
      console.log(payload);
      for (var i = 0; i < payload.length; i++) {
        state.wordList.push(payload[i]);
      }
    },
    setWordList(state, payload){
      state.currentList = [];
      state.currentList.push(payload);
    },
    setWordListLoaded(state, payload){
      state.wordListsLoaded += payload;
    },
    spliceWordList(state, payload){
      state.wordList.splice(payload["index"], payload["amount"]);
    }
    // removeLastWord(state){
    //  state.words.pop();
    // }
  },
  actions: {
    login (state, payload){
      var that = this;
      fetch('http://18.188.201.66:8081/login', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
          if (!res.ok){
            res.json().then(function(err){
              that.commit("setPreloaderMsg", err["error"]);
            setTimeout(function(){ // UX
              that.commit("setPreloader", false);
            }, 500);
              throw new Error();
            });
          }
          return res.json();
      }).then(response => {
        console.log('Success:', response);
        this.commit('setUser', response.user);
        this.commit("setJWT", response.token);
      })
    },

    register (state, payload){
      var that = this;
      fetch('http://18.188.201.66:8081/register', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
          if (!res.ok){
            res.json().then(function(err){
              this.commit("setPreloaderMsg", err["message"]);
            setTimeout(function(){ // UX
              that.commit("setPreloader", false);
            }, 500);
              throw new Error();
            });
          }
          return res.json();
      }).then(response => {
        console.log('Success:', response);
        // this.commit('setLoginError', '');
        this.commit("setJWT", response.token);
      })
    },

    savePassword (state, payload){
      var that = this;
      this.commit("setPreloaderMsg", "Creating New Password");
      fetch('http://18.188.201.66:8081/createNewPassword', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': state.jwt
        }
      }).then(res => {
          if (!res.ok){
            res.json().then(function(err){
            this.commit("setPreloaderMsg", err["message"]);
            setTimeout(function(){ // UX
              that.commit("setPreloader", false);
            }, 500);
              throw new Error();
            });
          }
          return res.json();
      }).then(response => {
        console.log('Success:', response);
        that.commit("setPreloader", false);
      })
    },

    resetPassword (state, payload){
      var that = this;
      this.commit("setPreloaderMsg", "Emailing Password");
      fetch('http://18.188.201.66:8081/resetPassword', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': state.jwt
        }
      }).then(res => {
          if (!res.ok){
            res.json().then(function(err){
            console.log(err);
            that.commit("setPreloaderMsg", err["message"]);
            setTimeout(function(){ // UX
              that.commit("setPreloader", false);
              that.commit("setModal", false);
            }, 500);
              throw new Error();
            });
          }
          return res.json();
      }).then(response => {
        console.log('Success:', response);
        this.commit("setPreloaderMsg", "Password Sent");
        this.commit("setPreloader", false);
      })
    },

    getStockWordList (state){
      this.commit("setPreloaderMsg", "Downloading Stock WordLists");

      var language = state.state.language.split("-")[1],
          nativeLanguage = state.state.nativeLanguage.split("-")[1];

      if (language == "US") { language = "EN" }
      if (nativeLanguage == "US") { nativeLanguage = "EN" }

      fetch('http://18.188.201.66:8081/getListByLanguage', {
        method: "POST",
        body: JSON.stringify({
          fromLang: nativeLanguage,
          toLang: language
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': state.jwt
        }
      }).then(res => {
        if (!res.ok){
          res.json().then(function(err){
          this.commit("setPreloaderMsg", err["message"]);
          setTimeout(function(){ // UX
            this.commit("setPreloader", false);
          }, 500);
            throw new Error();
          });
        }
        return res.json();
      }).then(response => {
        console.log('Success');
        this.commit("setPreloaderMsg", "Parsing Stock WordLists");
        var res = response["listArr"],
            filteredRes = [];

        for (var i = 0; i < res.length; i++) {

          if (res[i]["words"] != null) {
            let newWordsArr = [],
                splitArr = res[i]["words"].toString().split(",");

            for (var n = 0; n < splitArr.length; n = n+2) {
              let arr = [splitArr[n], splitArr[n+1]];
              newWordsArr.push(arr);
            }

            res[i]["words"] = newWordsArr;
            filteredRes.push(res[i]);
          }

        }
        this.commit("addList", filteredRes);
        this.commit("setWordListLoaded", 1);
      })
    },

    getListByUser (state){
      this.commit("setPreloaderMsg", "Downloading User WordLists");
      console.log(state);

      fetch('http://18.188.201.66:8081/getListByUser', {
        method: "POST",
        body: JSON.stringify({
          userId: state.state.user.id
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': state.jwt
        }
      }).then(res => {
        if (!res.ok){
          res.json().then(function(err){
          this.commit("setPreloaderMsg", err["error"]);
          setTimeout(function(){ // UX
            this.commit("setPreloader", false);
          }, 500);
            throw new Error();
          });
        }
        return res.json();
      }).then(response => {
        console.log('Success');
        console.log(response);
        this.commit("setPreloaderMsg", "Parsing User WordLists");
        var res = response["listArr"],
            filteredRes = [];

        for (var i = 0; i < res.length; i++) {

          if (res[i]["words"] != null) {
            let newWordsArr = [],
                splitArr = res[i]["words"].toString().split(",");

            for (var n = 0; n < splitArr.length; n = n+2) {
              let arr = [splitArr[n], splitArr[n+1]];
              newWordsArr.push(arr);
            }

            res[i]["words"] = newWordsArr;
            filteredRes.push(res[i]);
          }

        }
        console.log(filteredRes);
        this.commit("addList", filteredRes);
        this.commit("setWordListLoaded", 1);
      })
    },

    userCreateList (state, payload){
      this.commit("setPreloaderMsg", "Uploading WordList");

      fetch('http://18.188.201.66:8081/userCreateList', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': state.jwt
        }
      }).then(res => {
        if (!res.ok){
          res.json().then((err) => {
            this.commit("setPreloaderMsg", err["message"]);
            setTimeout(() => { // UX
              this.commit("setPreloader", false);
            }, 500);
             throw new Error();
          });
        }
        return res.json();
      }).then(response => {
        console.log('Success');
        console.log(response);
        this.commit("setPreloaderMsg", "Created WordList");
        setTimeout(() => {
          this.commit("setPreloader", false);
          this.commit("setModal", false);
        }, 500);
      })

    },

    updateList (state, payload){
      this.commit("setPreloaderMsg", "Saving WordList");

      fetch('http://18.188.201.66:8081/updateList', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': state.jwt
        }
      }).then(res => {
        if (!res.ok){
          res.json().then((err) => {
            this.commit("setPreloaderMsg", err["error"]);
            setTimeout(() => { // UX
              this.commit("setPreloader", false);
            }, 500);
             throw new Error();
          });
        }
        return res.json();
      }).then(response => {
        console.log('Success');
        console.log(response);
        this.commit("setPreloaderMsg", "Wordlist Saved");
        setTimeout(() => {
          this.commit("setPreloader", false);
        }, 500);
      })

    },

    deleteList (state, payload){
      this.commit("setPreloaderMsg", "Deleting WordList");

      fetch('http://18.188.201.66:8081/deleteList', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': state.jwt
        }
      }).then(res => {
        if (!res.ok){
          res.json().then((err) => {
            this.commit("setPreloaderMsg", err["error"]);
            setTimeout(() => { // UX
              this.commit("setPreloader", false);
            }, 500);
             throw new Error();
          });
        }
        return res.json();
      }).then(response => {
        console.log('Success');
        console.log(response);
        this.commit("setPreloaderMsg", "Wordlist Deleted");
        setTimeout(() => {
          this.commit("setPreloader", false);
          this.commit("setModal", false);
          console.log(state);
          for (var i = 0; i < state.wordList.length; i++) {
            if (payload["id"] === state.wordList[i]["id"]){
              this.commit("spliceWordList", {
                "index": i,
                "amount": 1
              });
            }
          }
          if (payload["id"] === state.currentList.id) {
            this.commit("setCurrentList", []);
          }
        }, 500);
      })

    }

  }
})

export default store;