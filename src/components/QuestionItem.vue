<template>
	<div v-if="item.type==='SYSTEM'">
		{{ item.text }}
		<div v-if="item.action==='STOP_GAME'">
			<a href="/">Start new game</a>
		</div>
	</div>
	<div class="question-item" :class="item.answer" v-else>
		<div class="typemark">
			<span>
				{{ item.type }} {{ item.question_number }}
			</span>
		</div>
		<div class="main-area">
			{{item.text}}
		</div>
		<div class="answer">
			<span v-if="item.answer">
				{{item.answer}}
			</span>
			<span v-else>
				<div v-if="$store.state.messages.role === 'owner'">
					<button @click="submit('yes')">Yes</button>
					<button @click="submit('no')">No</button>
				</div>
				<span v-else>waiting for answer...</span>
			</span>			
		</div>
	</div>
</template>

<script>
export default {
	
	props: {
		item: {
			type: Object
		}
	},

	methods: {
		submit(answer) {
			this.$emit('submit', {id: this.item.id, answer})
		}
	}

}
</script>

<style lang="scss">
.question-item {
	display: flex;
	flex-direction: row;
	background-color: #eee;
	box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
	border-radius: 4px;
	padding: 10px;
	margin-bottom: 15px;
	
	& .typemark {
		display: block;
		text-align: left;
		width: 20%;
		padding: 2px 5px;
		text-transform: capitalize;
		
	}
	& .main-area {
		display: block;
		align-content: center;
		border-left: 1px red solid;
		width: 60%;
		padding: 2px 5px;
	}
	& .answer {
		display: block;
		width: 20%;
		align-content: center;
		border-left: 1px red solid;
		padding: 2px 5px;
	}
	&.yes {
		background-color: #dcf8c6;
	}
	&.no {
		background-color: #f8cec6;
	}
}
</style>