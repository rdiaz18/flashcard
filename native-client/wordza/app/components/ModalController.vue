<template>
	<AbsoluteLayout id="modalContainer">

	    <StackLayout class="modal" md-with-hover v-if="CSVModal == true">
				
			<StackLayout class="header">
				<Label text="Upload List from CSV" class="title" />
				<Label text="Please follow format for succesful uploading" class="subhead" />
			</StackLayout>
			
			<StackLayout class="content">
				<Label text="New List Name" />
				<TextField v-model="newListName" />
				<TextView v-model="textCSV" />
			</StackLayout>

			<FlexLayout class="footer">
				<Button @click="showCSVModal = false" text="Cancel" />
				<Button @click="uploadCSV" text="Upload" />
			</FlexLayout>

		</StackLayout>

		<StackLayout class="modal" md-with-hover v-if="NewListModal == true">
			
			<StackLayout class="header">
				<Label class="title" text="Create List" />
				<Label class="subhead" text="Subhead Here" />
			</StackLayout>

			<StackLayout class="content">
				<Label text="List Name" />
				<TextField v-model="listName" />
				<Label text="List Description" />
				<TextField v-model="listDescription" />
			</StackLayout>

			<FlexLayout>
<!-- 		  		<select v-model="nativeLanguage">
		  			<optgroup v-for="(category, index) in $store.getters.languageCategories" :label="category">
		  				<option v-for="(lang, i) in $store.state.languages[category]" :value="lang[1]" :data-category="category" class="lang-flag">
		  					{{ lang[0] }}
		  				</option>
		  			</optgroup>
		  		</select>

		  		<select v-model="language">
		  			<optgroup v-for="(category, index) in $store.getters.languageCategories" :label="category">
		  				<option v-for="(lang, i) in $store.state.languages[category]" :value="lang[1]" :data-category="category" class="lang-flag">
		  					{{ lang[0] }}
		  				</option>
		  			</optgroup>
		  		</select> -->
		  	</FlexLayout>

			<FlexLayout>
				<Button @click="NewListModal = false" text="Cancel" />
				<Button @click="createNewList" text="Create" />
			</FlexLayout>

		</StackLayout>

		<StackLayout class="modal" v-if="DeleteListModal">

			<StackLayout class="header">
				<Label class="title" text="Delete List" />
			</StackLayout>

			<StackLayout class="content">
				<Label text="Select WordList to Delete" class="subhead" />
				<ListPicker v-model="listIdToDelete" :items="$store.getters.wordLists" />
			</StackLayout>

			<StackLayout>
				<Button @click="closeModal" text="Cancel" />
				<Button @click="deleteList" text="Delete" />
			</StackLayout>

	    </StackLayout>

		<StackLayout id="passwordReset" class="modal" md-with-hover v-if="PasswordResetModal == true">

			<StackLayout>
				<Label class="title" text="No Problem!" />
			</StackLayout>

			<StackLayout>
				<Label class="subhead" text="Please enter your Wordza email" />
				<TextField v-model="email" hint="Enter Email" />
			</StackLayout>

			<StackLayout class="footer">
				<Button @click="resetPassword" text="Okay" />
			</StackLayout>

		</StackLayout>

<!-- 		<div id="modalFade"></div> -->
	</AbsoluteLayout>
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

		.modal {
			top: 50%;
			left: 50%;
			height: 50%;
			width: 50%;
			transform: translateX(-50%) translateY(-50%);
			background-color: lightgray;

			textarea {
				width: 100%;
				min-height: 200px;
				margin-top: 20px;
			}
		}

		#modalFade {
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: rgba(0,0,0,0.6);
			position: absolute;
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