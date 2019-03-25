<template>
  <div id="words">

    <md-card id="list-select-container">
      <md-card-header>
        <div class="md-title">Word List Select</div>
      </md-card-header>

      <div id="listController">
        <md-field>
          <label style="margin-left: 5px">Word List</label>
          <md-select id="list-select" v-model="currentListID" @input="onChangeCurrentList">
            <md-option v-for="(list, index) in wordLists" :key="index" :value="list.id">
              {{list.name}}
            </md-option>
          </md-select>
        </md-field>
        <md-button @click="showModal('newListModal')">Create New List</md-button>
        <md-button @click="showModal('CSVModal')">Create List from CSV</md-button>
        <md-button @click="showModal('deleteListModal')">Delete List</md-button>
        <md-button @click="showModal('saveListModal')" :class="{ listEdit: editedList }">Save List</md-button>
      </div>

      <!-- Left Col Flag Img -->

      <div class="lang-select" v-if="$store.getters.currentList.length !== 0">
        <h1>I Learn <span class="flag-container" :style="{ backgroundImage: `url(${langSrc})` }"></span></h1>
      </div>

      <!-- Right Col Flag Img -->

      <div class="lang-select" v-if="$store.getters.currentList.length !== 0">
        <h1>I Know <span class="flag-container" :style="{ backgroundImage: `url(${nativeLangSrc})` }"></span>
        </h1>
      </div>

    </md-card>
    <md-table>
      <md-table-row>
        <md-table-head v-show="!mobile">Index</md-table-head>
        <md-table-head>Word</md-table-head>
        <md-table-head>Meaning</md-table-head>
      </md-table-row>
      <WordRow v-for="(word, index) in computedList" :key="index" :index="index" :word="word[0]" :meaning="word[1]"
               @editedList="editList"></WordRow>
    </md-table>

    <ModalController :CSVModal="CSVModal" :NewListModal="newListModal" :DeleteListModal="deleteListModal"
                     :SaveListModal="saveListModal" @close="closeModal" v-if="showModalState"/>

  </div>
</template>

<script>
  import WordRow from "../components/WordRow.vue";
  import ModalController from "../components/ModalController.vue";
  import {mapGetters} from 'vuex';

  export default {
    name: "Words",
    components: {
      WordRow,
      ModalController
    },
    beforeMount() {
      var that = this;

      // Map Asset Flags
      function importAll(r) {
        r.keys().forEach(key => that.imgCache[key] = r(key));
      }

      importAll(require.context('../assets/flags/', true, /\.png$/));
    },
    mounted() {
      // Remove Preloader
      this.$store.commit("setPreloader", false);
      this.currentListID = this.currentList ? this.currentList.id : null;
    },
    computed: {
      ...mapGetters({
        showModalState: 'showModal',
        computedList: 'currentListWords',
        wordLists: 'wordLists'
      }),
      langSrc() {
        var key = `./flag-${this.country}.png`,
          url = this.imgCache[key];

        return url;
      },
      nativeLangSrc() {
        var key = `./flag-${this.nativeCountry}.png`,
          url = this.imgCache[key];

        return url;
      }
    },
    methods: {
      onChangeCurrentList(item) {
        if (item) {
          let list = this.wordLists.find((v) => v.id === item);
          this.$store.commit("setCurrentList", list);
        }
      },
      mobile() {
        console.log(window.innerWidth);
        return window.innerWidth < 480;
      },
      showModal(p) {
        console.log(p);
        if (p === "newListModal") {
          this.newListModal = true;
        } else if (p === "CSVModal") {
          this.CSVModal = true;
        } else if (p === "deleteListModal") {
          this.deleteListModal = true;
        } else if (p === "saveListModal") {
          // this.saveListModal = true
          this.$store.dispatch("updateList", this.$store.state.currentList);
          this.editedList = false;
        }
        this.$store.commit("setModal", true);
      },
      closeModal() {
        this.newListModal = false;
        this.CSVModal = false;
        this.deleteListModal = false;
        this.saveListModal = false;
        this.$store.commit("setModal", false);
      },
      editList() {
        this.editedList = !this.editedList;
      }
    },
    data() {
      return {
        currentListID: null,
        currentList: this.$store.getters.currentList,
        newListName: '',
        country: this.$store.getters.currentLang,
        nativeCountry: this.$store.getters.currentNativeLang,
        imgCache: {},
        CSVModal: false,
        newListModal: false,
        deleteListModal: false,
        saveListModal: false,
        editedList: false
      };
    }
  };
</script>

<style>
  .md-card-header,
  h1 {
    background-color: #2799f9;
    color: white;
    margin: auto;
    padding: 20px 0px;
  }
</style>

<style lang="scss" scoped>
  #words {
    .md-card-header,
    h1 {
      background-color: #2799f9;
      color: white;
      margin: auto;
      padding: 20px 0px;
    }

    .md-menu.md-select {
      background-color: white;
    }

    .md-field {
      min-height: 30px;
    }

    .md-table {
      background-color: rgba(0, 0, 0, 0.50);
      padding: 0px 5px 0px 10px;
      color: white;
    }

    .md-table-row {
      background-color: transparent;
    }
  }

  .md-table .md-table-content {
    overflow: initial !important;
  }


  .lang-select {
    width: calc(100% / 2) !important;
    display: flex;

    h1 {
      padding-right: 25px;
      margin-left: -50px !important;
    }
  }

  .flag-container {
    width: 100px;
    height: 50px;
    position: absolute;
    top: calc(100% - 55px);
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

  #lang-container,
  #list-select-container {
    max-width: 800px;
    margin: auto;
    position: relative;
  }

  #list-select-container {
    background-color: white;
    overflow: hidden;

    & div {
      width: 100%;
      display: inline-block;
    }

    & div div,
    input {
      width: 100%;
    }

    & div div.md-menu.md-select {
      display: flex;
    }
  }

  #listController {
    padding: 15px;
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

  .listEdit {
    animation: flash 2s infinite;
    animation-direction: alternate;
  }

  @keyframes flash {
    from {
      background-color: white;
      color: black;
    }
    to {
      background-color: #2799f9;
      color: white;
    }
  }

  @media (max-width: 420px) {
    h1 {
      font-size: 1.6em !important;
    }

    #lang-container .lang-select h1 {
      padding-left: 10px;
      text-align: left;
    }
  }
</style>

<style>
  @media (max-width: 420px) {
    .md-table-cell-container {
      padding: 0px !important;
    }
  }
</style>
