<template>
	<div class="question-form">
		<div class="input-base">
			<div class="label-holder" v-if="false">
				Type a question here and hit Enter
			</div>
			<div class="input-holder">
				<input aria-invalid="false" id="message" type="text" v-model="question" placeholder="Type question or guess the word here">
			</div>
			<div class="buttons-holder">
				<button @click="submitQuestion" :disabled="$store.state.messages.questionsDisabled || waiting">Ask question</button>
				<button @click="submitGuess">Guess the word</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	props: {
		waiting: {
			type: Boolean,
			default: false
		}
	},

	data () {
		return {
			question: ""
		}
	},

	methods: {

		submitQuestion() {

			if(!this.question || !this.question.length)
				return

			this.$emit('submit', {
					type: 'question',
					text: this.question
				}
			)
			this.question = ""
		},

		submitGuess() {

			if(!this.question || !this.question.length)
				return

			this.$emit('submit', {
					type: 'guess',
					text: this.question
				}
			)
			this.question = ""
		}		

	}
}
</script>

<style lang="scss">
.question-form {
    color: rgba(0, 0, 0, 0.87);
    font-size: 1rem;
	line-height: 1.1875em;	
	& input {
		font: inherit;
		width: 100%;
		border: 1px grey solid;
		border-radius: 3px;
		height: 1.1875em;
		padding: 18.5px 14px;	
	}

	& .input-base {
		width: 100%;
	}


	& .label-holder {
		width: 100%;
		text-align: left;
		color: #555;
	}

	& .input-holder {
		display: flex
	}

	& button {
		width: 50%;
		box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
		padding: 6px 16px;
		font-size: 0.875rem;
		min-width: 64px;
		box-sizing: border-box;
		transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
		font-family: "Roboto", "Helvetica", "Arial", sans-serif;
		font-weight: 500;
		line-height: 1.75;
		border-radius: 4px;
		letter-spacing: 0.02857em;
		text-transform: uppercase;		
	}
}




</style>