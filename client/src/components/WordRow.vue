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
				lastMeaning: 'previousMeaning'
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
				// let lastWord = this.$store.getters.lastWord;
				let that = this;
				console.log("that.lastWord");
				console.log(that.lastWord);
				console.log("that.lastMeaning");
				console.log(that.lastMeaning);
				if (this.lastWord == false || this.lastMeaning.length == false) {
					this.$store.commit("addEmptyWord");
				}
				// Check if Extra Empty Row
				// if (this.$store.getters.duplicateEmptyCheck == true) {
				// 	this.$store.commit("removeLastWord");
				// }
				
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