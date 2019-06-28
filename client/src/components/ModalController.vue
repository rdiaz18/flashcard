<template>
  <div id="modalContainer">

    <md-card class="modal" md-with-hover v-if="CSVModal">
      <md-card-header>
        <div class="md-title">
          Upload List from CSV
        </div>
        <div class="md-subhead">
          Please follow format for succesful uploading
        </div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>New List Name</label>
          <md-input v-model="newListName"></md-input>
        </md-field>
        <textarea v-model="textCSV"></textarea>
      </md-card-content>
      <md-card-actions>
        <md-button @click="closeModal" name="Cancel">Cancel</md-button>
        <md-button @click="uploadCSV" name="Upload">Upload</md-button>
      </md-card-actions>
    </md-card>

    <md-card class="modal" md-with-hover v-if="NewListModal">
      <md-card-header>
        <div class="md-title">
          Create List
        </div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>List Name</label>
          <md-input v-model="listName"></md-input>
        </md-field>
        <md-field>
          <label>List Description</label>
          <md-input v-model="listDescription"></md-input>
        </md-field>
        <md-field class="select-container">
          <label>Select Language You Plan to Learn</label>
          <md-select v-model="language">
            <md-optgroup v-for="(category, index) in $store.getters.languageCategories" :key="index" :label="category">
              <md-option v-for="(lang, i) in $store.state.languages[category]" :key="i" :value="lang[1]" :data-category="category"
                      class="lang-flag">
                {{ lang[0] }}
              </md-option>
            </md-optgroup>
          </md-select>
        </md-field>
        <md-field class="select-container">
          <label>Select Language You Already Know</label>
          <md-select v-model="nativeLanguage">
            <md-optgroup v-for="(category, index) in $store.getters.languageCategories" :key="index" :label="category">
              <md-option v-for="(lang, i) in $store.state.languages[category]" :value="lang[1]" :key="i" :data-category="category"
                      class="lang-flag">
                {{ lang[0] }}
              </md-option>
            </md-optgroup>
          </md-select>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button @click="closeModal" name="Cancel">Cancel</md-button>
        <md-button @click="createNewList" name="Create">Create</md-button>
      </md-card-actions>
    </md-card>

    <md-card md-with-hover class="modal" v-if="DeleteListModal">
      <md-card-header>
        <div class="md-title">
          Delete List
        </div>
      </md-card-header>
      <md-card-content>
        <md-field>
          <label>Select WordList to Delete</label>
          <md-select v-model="listIdToDelete">
            <md-option v-for="(list, index) in $store.getters.wordLists" :value="list['id']" :key="index">
              {{ list['name'] }}
            </md-option>
          </md-select>
        </md-field>
      </md-card-content>
      <md-footer>
        <md-button @click="closeModal" name="Cancel">Cancel</md-button>
        <md-button @click="deleteList" name="Delete">Delete</md-button>
      </md-footer>
    </md-card>

    <md-card id="passwordReset" class="modal" md-with-hover v-if="PasswordResetModal">
      <md-card-header>
        <div class="md-title">
          No Problem!
        </div>
      </md-card-header>
      <div class="md-subhead">
        Please enter your Wordza email
      </div>
      <md-input v-model="email" placeholder="Enter Email"></md-input>
      <md-card-actions>
        <md-button @click="resetPassword" name="Reset Password">Okay</md-button>
      </md-card-actions>
    </md-card>

    <div id="modalFade"></div>
  </div>
</template>

<script>
  export default {
    name: "ModalController",
    props: {
      CSVModal: Boolean,
      NewListModal: Boolean,
      DeleteListModal: Boolean,
      SaveListModal: Boolean,
      PasswordResetModal: Boolean
    },
    methods: {
      createNewList(){
        this.$store.commit("setPreloader", true);
        this.$store.dispatch("userCreateList", {
          "name": this.listName,
          "description": this.listDescription,
          "words": "",
          "language": this.language,
          "nativeLanguage": this.nativeLanguage,
          "userId": this.$store.state.user.id
        });
        this.$emit('close')
      },
      resetPassword(){
        this.PasswordResetModal = false;
        this.$store.commit("setPreloader", true);
        this.$store.dispatch("resetPassword", {"email": this.email});
        this.$emit('close')
      },
      closeModal(){
        this.$emit('close')
      },
      uploadCSV(){
        // this.$emit('close')
      },
      deleteList() {
        this.$store.dispatch("deleteList", {"id": this.listIdToDelete});
        this.$emit('close')
      }
    },
    data() {
      return {
        email: "",
        listName: "",
        listDescription: "",
        language: "",
        nativeLanguage: "",
        newListName: '',
        listIdToDelete: null,
        textCSV:
          `Example CSV Format Below
				Word, Meaning #1, Meaning #2...

				и, "and, though",
				в, "in, at",
				не, "not",
				он, "he",
				на, "on, in, at, to"`

      }
    }
  }
</script>

<style scoped lang="scss">
  #modalContainer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: block;

    .md-input {
      background-color: white;
      padding-left: 5px;
    }

    .modal {
      top: 50%;
      left: 50%;
      max-height: 50%;
      width: 50%;
      transform: translateX(-50%) translateY(-50%);
      background-color: white;

      textarea {
        width: 100%;
        min-height: 200px;
        margin-top: 20px;
        background-color: lightgray;
      }
    }

    #modalFade {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.6);
      position: absolute;
    }

    .select-container,
    .select-container select {
      width: 100% !important;
    }

    .md-menu.md-select {
      background-color: white;
    }

  }

  #passwordReset.modal {
    background-color: white;

    .md-button {
      display: block;
      margin: auto;
    }

    .md-input {
      width: 75%;
      margin-top: 15px;
    }
  }
</style>
