import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     apiKeys: {
      google: "",
      yandex: "trnsl.1.1.20190114T000445Z.95291844b30dc809.79341b7169f080deb7cfa0ce4eb4a65e7897cf3a"
     },
     email: "mpaccione1991@gmail.com",
     password: "rspaccio",
     ttsExpiry: "Purchased",// "Not Purchased",
     login: true,
     currentWord: 0,
     correct: 0,
     incorrect: 0,
     skipped: 0,
     currentList: "Top 1,000 Words",
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
     wordList: [
      {
        title: "Top 1,000 Words",
        id: 0,
        words: [
          ["и", "and, though"],
          ["в", "in, at"],
          ["не", "not"],
          ["он", "he"],
          ["на", "on, in, at, to"],
          ["я", "i"],
          ["что", "what, that, why"],
          ["тот", "that"],
          ["быть", "to be"],
          ["с", "with, and, from, of"],
          ["а", "while, and, but"],
          ["весь", "all, everything"],
          ["это", "that, this, it"],
          ["как", "how, what, as , like"],
          ["она", "she"],
          ["они", "they"],
          ["к", "to, for, by"],
          ["у", "by, with, of"],
          ["ты", "you, thou"],
          ["из", "from, of, in"],
          ["мы", "we"],
          ["за", "behind, over, at, after"],
          ["вы", "you"],
          ["так", "so, thus, then"],
          ["же", "and, as, for, but, same"],
          ["от", "from, of, for"],
          ["сказать", "to say, to speak"],
          ["зтот", "this"],
          ["который", "which, who, that"],
          ["мочь", "be able"],
          ["человек", "man, person"],
          ["о", "of, about, against"],
          ["один", "one, some, alone"],
          ["ещё", "stil, yet"],
          ["бы", "would"],
          ["такой", "such, so, some"],
          ["только", "only, merely, but"],
          ["себя", "myself, himself, herself"],
          ["своё", "one's own, my, our"],
          ["какой", "what, which, how"],
          ["когда", "when, while, as"],
          ["уже", "already, by now"],
          ["для", "for, to"],
          ["вот", "here, there, this is, that's"],
          ["кто", "who, that, some"],
          ["говорить", "to say, to tell, to speak"],
          ["год", "year"],
          ["знать", "to know, be aware"],
          ["мой", "my, mine"],
          ["до", "to, up to, about, before"],
          ["или", "or"],
          ["если", "if"],
          ["время", "time, season"],
          ["рука", "hand, arm"],
          ["самый", "most, the very, the same"],
          ["ни", "not a, not, neither, nor"],
          ["стать", "to become, begin, come"],
          ["большой", "bug, large, important"],
          ["даже", "even"],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""]
        ]
      }
    ]
  },
  getters: {
  	allWords(state){
      for (var i = 0; i < state.wordList.length; i++) {
        if (state.wordList[i].title == state.currentList){
          return state.wordList[i].words;
        }
      }
  	},
  	currentWordCount(state){
  		return state.currentWord;
  	},
  	currentWord(state){
      for (var i = 0; i < state.wordList.length; i++) {
        if (state.wordList[i].title == state.currentList){
          return state.wordList[i].words[state.currentWord][0];
        }
      }
  	},
  	currentMeaning(state){
      for (var i = 0; i < state.wordList.length; i++) {
        if (state.wordList[i].title == state.currentList){
          return state.wordList[i].words[state.currentWord][1];
        }
      }
  	},
    previousWord(state){
          if (state.currentWord != 0) {
               for (var i = 0; i < state.wordList.length; i++) {
                    if (state.wordList[i].title == state.currentList){
                         return state.wordList[i].words[state.currentWord - 1][0];
                    }
               }
          } else {
               return false;
          }
     },
     previousMeaning(state){
          if (state.currentWord != 0) {
               for (var i = 0; i < state.wordList.length; i++) {
                    if (state.wordList[i].title == state.currentList){
                         return state.wordList[i].words[state.currentWord - 1][1];
                    }
               }
          } else {
               return false;
          }
     },
     nextWord(state){
          console.log(state.currentWord+" | "+state.wordList[0].words.length);
          if (state.currentWord != state.wordList[0].words.length) {
               for (var i = 0; i < state.wordList.length; i++) {
                    if (state.wordList[i].title == state.currentList){
                         return state.wordList[i].words[state.currentWord + 1][0];
                    }
               }
          } else {
               return false;
          }
     },
     nextMeaning(state){
          if (state.currentWord != state.wordList.length) {
               for (var i = 0; i < state.wordList.length; i++) {
                    if (state.wordList[i].title == state.currentList){
                         return state.wordList[i].words[state.currentWord + 1][1];
                    }
               }
          } else {
               return false;
          }
     },
  	lastWord(state){
      for (var i = 0; i < state.wordList.length; i++) {
        if (state.wordList[i]["title"] == state.currentList){
          return state.wordList[i]["words"][state.wordList[i]["words"].length-1];
        }
      }
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
  	},
    languageCategories(state){
      let arr = [];
      for (var category in state.languages){
           arr.push(category);
      }
      console.log(arr);
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
    currentListTitle(state){
        return state.currentList;
    },
    email(state){
        return state.email;
    },
    password(state){
        return state.password;
    },
    ttsExpiry(state){
        return state.ttsExpiry;
    }
  },
  mutations: {
  	login(state){
  		state.login = true;
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
      for (var i = 0; i < state.wordLists.length; i++) {
        if (state.wordLists[i]["title"] == state.currentListTitle){
          state.wordLists[i]["words"][payload["index"]][0] = payload["word"];
          state.wordLists[i]["words"][payload["index"]][1] = payload["meaning"];
        }
      }
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
      state.wordList.push({
        "title": payload,
        "id": state.wordList.length, // id = index for now
        "words": [
          ["", ""]
        ]
      });
      state.currentList = payload;
      console.log(state.wordList);
    }
  	// removeLastWord(state){
  	// 	state.words.pop();
  	// }
  },
  actions: {
  	
  }
})