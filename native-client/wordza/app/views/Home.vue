<template>
    <Page actionBarHidden="false">
        <ActionBar title="Wordza: Language Flashcards!" android:flat="true"/>
        <GridLayout columns="*" rows="*,*,*">
          <Label text="Flashcards" row="0" col="0" @tap="$goto('cards')" />
          <Label text="Wordlists" row="1" col="0"  @tap="$goto('words')" />
          <Label text="Account" row="2" col="0"  @tap="$goto('account')" />
        </GridLayout>
    </Page>
</template>

<script >
    export default {
        data() {
            return {
                msg: 'Hello World!'
            }
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    label {
      text-align: center;
    }
</style>
