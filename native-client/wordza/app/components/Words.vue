<template>
	<Page>
		<ActionBar title="Word List" flat="true">
			<NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$goto('home')" />
			<ActionItem tap="onCancel"  ios.systemIcon="1" android.systemIcon="ic_menu_close_clear_cancel" @tap="showModal = true; deleteListPopup = true;" />
			<ActionItem ios.systemIcon="4" android.systemIcon="ic_menu_add" ios.position="right" @tap="showModal = true; createListPopup = true;"></ActionItem>
			<ActionItem @tap="saveCurrentList" ios.systemIcon="3" android.systemIcon="ic_menu_save" ios.position="right" />
			<!-- visibility="{{ isEditing ? 'visible' : 'collapse' }}" -->
		</ActionBar>

		<!-- Add List Modal -->
		<StackLayout v-if="showModal == true && createListPopup == true" class='modal'>
			<Label class="headline">Create A New Word List</Label>
			<FlexboxLayout>
				<Label text="Native Language" width="50%" />
				<Label text="Learning Language" width="50%" />
			</FlexboxLayout>
			<FlexboxLayout>
				<ListPicker :items="countries" selectedIndex="0" width="50%" />
				<ListPicker :items="countries" selectedIndex="0" width="50%" />
			</FlexboxLayout>
			<TextField hint="Enter New List Name" v-model="newListName" class="input" />
			<FlexboxLayout>
				<Button text="Close" @tap="closeModal" width="50%" />
				<Button text="Create List" @tap="createList" width="50%" />
			</FlexboxLayout>
		</StackLayout>

		<!-- Delete List Modal -->
		<StackLayout v-if="showModal == true && deleteListPopup == true" class="modal">
			<Label class="headline">Delete Word List</Label>
			<ListPicker :items="wordLists" selectedIndex="0" v-model="deleteListId"/>
			<FlexboxLayout>
				<Button text="Close" @tap="closeModal" width="50%" />
				<Button text="Delete List" @tap="deleteList" width="50%" />
			</FlexboxLayout>
		</StackLayout>

		<!-- Saving List Modal -->
		<StackLayout v-if="showModal == true && savingListPopup == true" class="modal v-align">
			<ActivityIndicator busy="true" />
		</StackLayout>

		<StackLayout>
			<!-- <FlexboxLayout> -->
			<ListPicker :items="wordLists" selectedIndex="0" />
			<!-- </FlexboxLayout> -->
			<ListView v-for="(word, index) in $store.getters.allWords">
				<v-template>
					<FlexboxLayout>
						<TextField :text="word[0]" class="wordListInput" />
						<TextField :text="word[1]" class="wordListInput" />
					</FlexboxLayout>	
				</v-template>
			</ListView>
		</StackLayout>
	</Page>
</template>

<script>
	export default {
		methods: {
			saveCurrentList(){ 
				this.showModal = true;
				this.savingListPopup = true;
			}, 
			closeModal(){
				this.showModal = false;
				this.createListPopup = false;
				this.deleteListPopup = false;
				this.savingListPopup = false;
			}
		},
		data(){
			return {
				showModal: false,
				createListPopup: false,
				deleteListPopup: false,
				savingListPopup: false,
				newListName: "",
				deleteListId: "",
				nativeLang: this.$store.getters.currentNativeLang,
				lang: this.$store.getters.currentLang,
				countries: this.$store.getters.languageCategories,
				allWords: this.$store.getters.allWords
			}
		}
	}
</script>

<style scoped>
	.headline {
		font-size: 24px;
		margin-bottom: 40px;
		background-color: black;
		color: white;
	}

	.wordListInput {
		width: 50%;
		border-bottom: 0px;
	}

	label {
		text-align: center;
	}

	.modal {
		margin: 30px;
	}

	.v-align {
		vertical-align: middle;
	}

	.modal .input,
	.modal button {
		margin-top: 30px;
		margin-bottom: 30px;
	}
</style>