<template>
  <div class="wrapper">
	<h2>20Q Game</h2>
	<h3>
		<input v-model="word">
		<a href="" @click.prevent="startNewSession">Start new session</a>
	</h3>
	<h3>
		<input v-model="session_id">
		<a href="" @click.prevent="joinSession">Join session</a>
	</h3>	
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