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
					<md-input name="password" type="password" v-model="confirmPassword" @keyup="confirmPassword"></md-input>
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
			confirmPassword(val){
				return parseFloat(val).toFixed(2) == parseFloat(this.selectedPackage).toFixed(2);
			},
			savePassword(){
				const urlSplit = window.location.href.split("/");
				this.$store.commit("showPreloader", true);
				this.$store.dispatch("saveNewPassword", {
					"token": urlSplit[urlSplit.length],
					"password": this.password
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	$accentColor: #2799f9;

	#account {
		max-width: 800px;
		margin: auto;
		display: block;
		position: relative;

		.md-title,
		.md-card-header {
			color: white;
			background-color: $accentColor;
		}

		.md-card {
			background-color: white;
		}

		.md-input, input, label, .md-label {
			padding: 10px;
			margin: 5px;
		}

		label {
			padding: 0px 0px 0px 5px;
		}

		.md-input, input, .md-field {
			background-color: white;
		}

		.icon-field {
			background-position: 10px;
			background-size: 24px;
			background-repeat: no-repeat;

			.md-label, .md-input, label {
				margin-left: 44px !important;
			}

		}

		#email-field {
			background-image: url("./../assets/email-icon.png");
		}

		#password-field {
			background-image: url("./../assets/password-icon.png");
		}

		#expiry-field {
			background-image: url("./../assets/clock-icon.png");
		}
	}

	#payment-container {
		display: flex;

		div {
			width: calc(100% / 3);
			background-color: white;

			&.selected {
				border: 5px solid green;
			}
		}
	}

	#password-container {
		display: flex;
	}

	#package-info {
		font-size: 16px;
	}

	#password-field {
		width: 90%;
	}

	#save-password-btn {
		background-color: white;
		height: 65px;
		margin: 4px 0px 0px 5px;	
	}

	.medal-icon {
		margin: 10px auto;
		height: 50px;
		width: auto;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	#free {
		background-image: url('./../assets/beg-icon.png');
		opacity: 0.8;
	}

	#bronze {
		background-image: url('./../assets/bronze-medal.png');
	}

	#silver {
		background-image: url('./../assets/silver-medal.png');
	}

	#gold {
		background-image: url('./../assets/gold-medal.png');
	}

	@media (max-width: 1023px){
		#account {
			max-width: 85% !important;
		}	
	}

	@media (max-width: 640px) and (orientation: landscape){
		#account {
			max-width: 100% !important;
		}
	}

	@media (max-width: 420px){
		#password-field {
			width: 65% !important;
		}

		#account .icon-field {
			overflow: hidden;
		}

		#payment-container {
			display: block !important;

			div {
				width: calc(100% - 30px) !important;
				padding-top: 10px;
				margin: 15px;
			}
		}
	}
</style>