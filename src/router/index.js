import Vue from 'vue'
import VueRouter from 'vue-router'
import SignxOrGo from '../components/SignxOrGo'

function buildRoute (path, Component) {

	return { 
		path: path, 
		component: SignxOrGo, 
		props : { success : Component }
	}
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    buildRoute(`/`, () => import('../views/Initial.vue')),
    buildRoute(`/session/:xid`, () => import('../views/Session.vue')),
  ]
})

export default router
