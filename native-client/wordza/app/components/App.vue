<template>
    <Page actionBarHidden="false">
        <ActionBar title="Wordza: Language Learning Flashcards!" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
<!--             <TabViewItem title="Account">
 -->                    <!-- <StackLayout id="login"> -->
                      <!-- <Image src="~/assets/logo/logo-color.jpg" stretch="none" />
                      <Label text="Email" />
                      <TextField v-model="email" />
                      <Label text="Password" />
                      <TextField v-model="password" /> -->  
                    <!-- </StackLayout> -->
                    <!-- <DockLayout stretchLastChild="false">
                      <Button text="Register" @tap="register" dock="bottom" />
                      <Button text="Login" @tap="Login" dock="bottom" />   
                    </DockLayout> -->
                <!-- <GridLayout columns="*" rows="*">
                    <Label class="message" :text="msg" col="0" row="0"/>
                </GridLayout> -->
                <Login />
            <!-- </TabViewItem> -->
            <TabViewItem title="Words">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 2 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Car">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>

        </TabView>
    </Page>
</template>

<script >
   import Login from '@/components/Login.vue'
    export default {
        components: {
            Login
        },
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
</style>
