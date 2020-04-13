<template>
	
	<div class="container-fluid">
		<h1 class="text-center block">
			
		</h1>
		<div class="row mb30">
			<div class="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3" v-if="mode == 'signin'">
				<h3 class="text-center text-uppercase mb30">Авторизация</h3>
				<SignIn class="mb15"></SignIn>

				<button type="submit" class="btn btn-link btn-block btn-lg" @click="mode = 'password'">Забыли пароль?</button>
			</div>
			<div class="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3" v-else-if="mode == 'password'">
				<h3 class="text-center text-uppercase mb30">Восстановить пароль</h3>

				<button type="submit" class="btn btn-link btn-block btn-lg" @click="mode = 'signin'">Войти</button>
			</div>
		</div>
	</div>
	
</template>

<script>
	import SignIn from './signx/SignIn.vue'

	export default {
		components : { SignIn },

		data () {

			return {
				mode : 'signin'
			}
		}
	}
</script>
