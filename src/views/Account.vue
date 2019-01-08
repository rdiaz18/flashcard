<template>
	<div id="account">
		<md-card>
			<md-card-header>
				<div class="md-title">Login Settings</div>
			</md-card-header>
			<md-field>
				<label>Email</label>
				<md-input name="email" type="email" disabled :value="$store.getters.email">{{ $store.getters.email }}</md-input>
			</md-field>
			<div id="password-container">
				<md-field id="password-field">
					<label>Password</label>
					<md-input name="password" type="password" :value="password" v-model="password">{{ $store.getters.password }}</md-input>
				</md-field>
				<md-button @click="savePassword" id="save-password-btn">Save Password</md-button>
			</div>
			<md-field>
				<label>TTS Expiry</label>
				<md-input name="tts-expiry" :value="$store.getters.ttsExpiry" disabled></md-input>
			</md-field>
		</md-card>
		<md-card>
			<md-card-header>
				<div class="md-title">
					Purchase TTS Package<br>
					<p id="package-info">
						Enables TTS Playback for Flashcards,
						Enables Saving of Multiple Word Lists,
						Disables Ads,
						No Refunds
					</p>
				</div>
			</md-card-header>
			<div id="payment-container">
				<div :class="{ selected: selectedCheck(3.99) }">
					<h2>One Month</h2>
					<h2>$3.99 / mo</h2>
					<h3>Total: $3.99</h3>
					<input type="radio" name="tts-package" value="3.99" @click="selectedPackage = 3.99"></input>
				</div>
				<div :class="{ selected: selectedCheck(17.94) }">
					<h2>Six Months</h2>
					<h2>$2.99 / mo</h2>
					<h3>Total: $17.94</h3>
					<input type="radio" name="tts-package" value="17.94" @click="selectedPackage = 17.94"></input>
				</div>
				<div :class="{ selected: selectedCheck(23.88) }">
					<h2>12 Months</h2>
					<h2>$1.99 / mo</h2>
					<h3>Total: $23.88</h3>
					<input type="radio" name="tts-package" value="23.88" @click="selectedPackage = 23.88"></input>
				</div>
			</div>
			<button id="paypal-button">Purchase</button>
		</md-card>
	</div>
</template>

<!-- <script>
  
</script> -->

<script>
	export default {
		name: "Account",
		mounted(){
			var that = this;
			return new Promise((resolve, reject) => {
				let script = document.createElement('script')
				script.onload = () => {
					paypal.Button.render({
					    // Configure environment
					    env: 'sandbox',
					    client: {
					      sandbox: 'demo_sandbox_client_id',
					      production: 'demo_production_client_id'
					    },
					    // Customize button (optional)
					    locale: 'en_US',
					    style: {
					      size: 'small',
					      color: 'gold',
					      shape: 'pill',
					    },

					    // Enable Pay Now checkout flow (optional)
					    commit: true,

					    // Set up a payment
					    payment: function(data, actions) {
					      return actions.payment.create({
					        transactions: [{
					          amount: {
					            total: parseFloat(that.selectedPackage).toFixed(2),
					            currency: 'USD'
					          }
					        }]
					      });
					    },
					    // Execute the payment
					    onAuthorize: function(data, actions) {
					      return actions.payment.execute().then(function() {
					        // Show a confirmation message to the buyer
					        window.alert('Thank you for your purchase!');
					      });
					    }
					  }, '#paypal-button');
				}
				script.async = true
				script.src = `https://www.paypalobjects.com/api/checkout.js`
				document.head.appendChild(script)
			})

		},
		data(){
			return {
				selectedPackage: "",
				password: this.$store.getters.password
			}
		},
		methods: {
			selectedCheck(val){
				console.log("val");
				console.log(parseFloat(val).toFixed(2));
				console.log("selected val");
				console.log(parseFloat(this.selectedPackage).toFixed(2));
				return parseFloat(val).toFixed(2) == parseFloat(this.selectedPackage).toFixed(2);
			},
			savePassword(){
				// this.$store.dispatch("savePassword", this.password);
			}
		}
	}
</script>

<style scoped lang="scss">
	#account {
		max-width: 800px;
		margin: auto;
		display: block;
		position: relative;

		.md-card {
			background-color: #dfdfdf;
		}

		.md-input, input, label, .md-label {
			padding: 10px;
			margin: 5px;
		}

		.md-input, input, .md-field {
			background-color: white;
		}

	}

	#payment-container {
		display: flex;

		div {
			width: calc(100% / 3);
			background-color: white;

			&.selected {
				border: 2px solid blue;
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
		height: 58px;
		margin: 4px 0px 0px 5px;	
	}
</style>