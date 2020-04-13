<template>
  <div class="wrapper">
	<h2>20Q Game</h2>

	<div class="login-form">
		<div class="input-base">
			<div class="label-holder" v-if="false">
				Type a question here and hit Enter
			</div>
			<div class="input-holder">
				<input aria-invalid="false" id="message" type="text" v-model="word" placeholder="Type a word here">
			</div>
			<div class="buttons-holder">
				<button @click.prevent="startNewSession">to start new game session</button>
			</div>
		</div>
	</div>

	<h1> OR </h1>

	<div class="login-form">
		<div class="input-base">
			<div class="label-holder" v-if="false">
				Type a question here and hit Enter
			</div>
			<div class="input-holder">
				<input aria-invalid="false" id="message" type="text" v-model="session_id" placeholder="Type session ID here">
			</div>
			<div class="buttons-holder">
				<button @click.prevent="joinSession">to join an ongoing session</button>
			</div>
		</div>
		
	</div>	



  </div>
</template>

<script>
export default {
	data () {
		return {
			word: null,
			session_id: null
		}
	},
	methods: {
		startNewSession () {
			if(!this.word)
				return

			this.$webSocketsSend({
				type: 'START_NEW_SESSION',
				word: this.word
			})
		},
		joinSession () {
			if(this.session_id && this.session_id.length)
				this.$router.push(`/session/${this.session_id}`)
		}
	}
}
</script>

<style lang="scss">
.login-form {
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
		text-align: center;
		&::placeholder {
			color: grey;
			text-transform: uppercase;
		}
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
		width: 100%;
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