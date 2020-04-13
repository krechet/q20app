import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import webSocketService from './services/webSocketService'

Vue.use(webSocketService, {
	store,
	router,
	url: 'ws://localhost:1339'
  })

Vue.config.productionTip = false

export function mobileVhFix () {
	window.addEventListener('resize', () => {
	  let vh = window.innerHeight * 0.01;
	  document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
