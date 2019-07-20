<template>
	<div id="reset">
		<md-card>
			<md-card-header>
				<div class="md-title">Password Reset</div>
			</md-card-header>
			<md-field id="new-password-field" class="icon-field">
				<label>Enter New Password</label>
				<md-input name="password" type="password" v-model="password"></md-input>
			</md-field>
			<div id="password-container">
				<md-field id="new-password-field" class="icon-field">
					<label>Confirm New Password</label>
					<md-input name="password" type="password" v-model="confirmPassword" @keyup="confirmPasswordCheck"></md-input>
				</md-field>
				<md-button @click="saveNewPassword" id="save-password-btn" :name="saveNewPasswordText">Save</md-button>
			</div>
		</md-card>
	</div>
</template>

<!-- <script>
  
</script> -->

<script>
	export default {
		name: "Reset",
		data(){
			return {
				confirmPassword: "",
				password: "",
				saveNewPasswordText: "Save" //this.$store.getters.menuKey.translation.save_password || "Save Password",
			}
		},
		methods: {
			confirmPasswordCheck(val){
				return parseFloat(val).toFixed(2) == parseFloat(this.selectedPackage).toFixed(2);
			},
			saveNewPassword(){
				const urlSplit = window.location.href.split("/");
				this.$store.commit("showPreloader", true);
				this.$store.dispatch("createNewPassword", {
					"resetToken": urlSplit[urlSplit.length],
					"password": this.password
				})
			}
		}
	}
</script>

<style scoped lang="scss">

	#reset {
		.md-card {
			background-color: white;	
		}
		button {
			background-color: #2799f9;
			color: white;
		}
	}

</style>
