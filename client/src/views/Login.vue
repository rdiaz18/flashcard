<template>
	<div>

		<LoginModal />

	</div>
</template>

<script>
	import LoginModal from '@/components/LoginModal.vue';
	export default {
		name: "Login",
		components: {
			LoginModal
		}
	}
</script>