<template>
	<md-table-row :id="index">
		<md-table-cell>
			<input :value="word">
		</md-table-cell>
		<md-table-cell>
			<input :value="meaning">
		</md-table-cell>
	</md-table-row>
</template>

<script>
	export default {
		name: "WordRow",
		props: ["word", "meaning", "index"],
		data(){
			return {

			}
		}
	}
</script>

<style scoped lang="scss">
	input {
		width: 100%;
		padding: 2.5px 0px 2.5px 5px;
	}
</style>