<template>
	<Page>
		<FlexboxLayout>
			<FlexboxLayout>
				<Label text="Native Language">
				<ListPicker :items="countries" selectedIndex="0" v-model="nativeLang" />
			</FlexboxLayout>
			<FlexboxLayout>
				<Label text="Learning Language">
				<ListPicker :items="countries" selectedIndex="0" v-model="lang" />
			</FlexboxLayout>
		</FlexboxLayout>
		<StackLayout>
			<ListView v-for="(word, index) in $store.getters.allWords">
				<v-template>
					<TextField :text="word[0]">
					<TextField :text="word[1]">	
				</v-template>
			</ListView>
		</StackLayout>
	</Page>
</template>

<script>
	export default {
		data(){
			return {
				nativeLang: this.$store.getters.currentNativeLang,
				lang: this.$store.getters.currentLang,
				countries: this.$store.getters.languageCategories,
				allWords: this.$store.getters.allWords
			}
		}
	}
</script>