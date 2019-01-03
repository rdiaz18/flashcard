<template>
	<md-table-row :id="index">
		<md-table-cell id="index-cell">
			{{ index + 1 }}
		</md-table-cell>
		<md-table-cell>
			<input v-model="word" @keyup="inputChange" placeholder="Enter Word">
		</md-table-cell>
		<md-table-cell>
			<input v-model="meaning" @keyup="inputChange" placeholder="Enter Meaning">
		</md-table-cell>
	</md-table-row>
</template>

<script>
	export default {
		name: "WordRow",
		props: ["word", "meaning", "index"],
		methods: {
			inputChange(){
				// Update Word in State
				this.$store.commit("updateWord", {
					"index": this.index,
					"word": this.word,
					"meaning": this.meaning
				});
				// Check if List Has Empty Row if Not Add 
				let lastWord = this.$store.getters.lastWord;
				if (lastWord[0].length > 0 || lastWord[1].length > 0) {
					this.$store.commit("addEmptyWord");
				}
				// Check if Extra Empty Row
				// if (this.$store.getters.duplicateEmptyCheck == true) {
				// 	this.$store.commit("removeLastWord");
				// }
				
			}	
		},
		data(){
			return {
				word: this.word,
				meaning: this.meaning,
				index: this.index
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
	}
</style>