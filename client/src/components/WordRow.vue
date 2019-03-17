<template>
	<md-table-row :id="index">
		<md-table-cell id="index-cell" v-if="!mobile">
			{{ index + 1 }}
		</md-table-cell>
		<md-table-cell>
			<input v-model="wordData" @keyup="inputChange" placeholder="Enter Word">
		</md-table-cell>
		<md-table-cell>
			<input v-model="meaningData" @keyup="inputChange" placeholder="Enter Meaning">
		</md-table-cell>
	</md-table-row>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		name: "WordRow",
		props: ["word", "meaning", "index"],
		computed: {
			...mapGetters({
				lastWord: 'previousWord',
				lastMeaning: 'previousMeaning',
				currentList: 'currentList',
				currentWordListLength: 'currentWordListLength'
			})
		},
		methods: {
			inputChange(){
				// Update Word in State
				this.$store.commit("updateWord", {
					"index": this.indexData,
					"word": this.wordData,
					"meaning": this.meaningData
				});
				// Check if List Has Empty Row if Not Add 
				let that = this;
				if ((this.indexData + 1) == this.currentWordListLength) {
					if (this.lastWord == undefined || this.lastMeaning == undefined || this.lastWord == "" || this.lastMeaning == "") {
						this.$store.commit("addEmptyWord");
					}
				}
				this.$emit("editedList");
				
			},
			mobile(){
				return window.innerWidth < 480 ? true : false 
			}	
		},
		data(){
			return {
				wordData: this.word,
				meaningData: this.meaning,
				indexData: this.index
			}
		}
	}
</script>

<style scoped lang="scss">
	#index-cell {
		text-align: left !important;
	}
	input {
		width: 100%;
		padding: 2.5px 0px 2.5px 5px;
		font-size: 1.8em;
	}
	table input {
		background-color: transparent;
		border: 0px;
		color: white;
	}
</style>