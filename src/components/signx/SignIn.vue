<template>
	<form class="anylook-form" @submit="send">
		<Preloader :showPreloader="showPreloader"></Preloader>
		<div class="form-group">
			<input class="form-control input-lg" v-model="email" type="text" placeholder="Email">
		</div>
		<div class="form-group">
			<input class="form-control input-lg" v-model="password" type="password" placeholder="Пароль">
		</div>

		<div v-if="error == 'incorrect' || error == 'empty'" class="alert alert-danger">
			<button type="button" class="close" @click="resetError"><span aria-hidden="true">&times;</span></button>
			
			Email или пароль не верен. Попробуйте еще раз	
		</div>

		<div v-if="error == 'no-access'" class="alert alert-danger">
			<button type="button" class="close" @click="resetError"><span aria-hidden="true">&times;</span></button>
			
			У вас нет доступа к приложению. Пожалуйста зарегистрируйтесь
		</div>

		<button type="submit" :class="['btn btn-primary btn-block btn-lg', sendLock ? 'is-loading' : '']">Войти</button>
	</form>	
</template>

<script>
	import axios from 'axios'
	import Preloader from '../Preloader.vue'

	export default {
		components : { Preloader },
		data () {

			return {
				showPreloader : false,
				email : '',
				password : '',
				error : null
			}
		},
		methods : {
			progress (active) {
				this.showPreloader = active
			},
			resetError (e) {

				e.preventDefault()
				this.error = null
			},
			send (e) {

				e.preventDefault()
				this.progress(true)
				this.error = null

				axios.post('/users:signin.json', {
					email: this.email,
					password: this.password
				})
				.then(rs => {

					this.progress(false)
					
					if (rs.data.success) {
						
						window.location.reload()
					}
					else if ('error' in rs.data) {
						this.error = rs.data.error
					}
				})
				.catch(err => {

					this.progress(false);
				})
			}
		}
	}
</script>
