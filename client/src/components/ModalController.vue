<template>
	<div id="modalContainer">

	    <md-card class="modal" md-with-hover v-if="CSVModal == true">
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
				<md-button @click="showCSVModal = false">Cancel</md-button>
				<md-button @click="uploadCSV">Upload</md-button>
			</md-card-actions>
		</md-card>

		<div id="modalFade"></div>
	</div>
</template>

<script>
	export default {
		name: "ModalController",
		props: ["CSVModal", "NewListModal", "DeleteListModal", "SaveListModal"],
		data(){
			return {
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

<style scoped type="scss">
	
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
</style>