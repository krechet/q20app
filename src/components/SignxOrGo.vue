<template>
	<component :is="useComponent"></component>
</template>

<script>
export default {
	props : [ 'status', 'success', 'error' ],
	computed: {
		useComponent () {
			console.log(this.$route)
			return this.$route.params.status == 403 ? this.error : this.success
		}
	}
}
</script>
