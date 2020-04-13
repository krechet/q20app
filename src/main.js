import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import webSocketService from './services/webSocketService'

Vue.use(webSocketService, {
	store,
	router,
	url: window.webpackHotUpdate ? 'ws://localhost:1339/ws': `ws://${window.location.host}/ws`
  })

console.log(`ws://${window.location.host}/ws`)

Vue.config.productionTip = false

console.log('Fixing mobile vh issue')

function mobileVhFix () {
	window.addEventListener('resize', () => {
	  let vh = window.innerHeight * 0.01;
	  document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
}

mobileVhFix()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
