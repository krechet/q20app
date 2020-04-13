<template>
	<div class="question-items">
		<QuestionItem v-for="i in items" :key="i.id" :item="i" @submit="submitAnswer" />
	</div>
</template>

<script>
import QuestionItem from "./QuestionItem.vue"

export default {

	components: { QuestionItem },

	props: {
		items: {
			type: Array,
			default: () => []
		}
	},

	methods: {
		submitAnswer(payload) {
			this.$emit('submitAnswer', payload)
		}
	}
}
</script>

<style lang="scss">
	.question-items {
		display: flex;
		flex-grow: 1;
		flex-direction: column-reverse;
		padding: 8px;
		overflow: auto;
		margin-bottom: 5px;
	}
</style>