import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Home from './components/Home'
import RiskType from'./components/RiskType'
import RiskTypeList from'./components/RiskTypeList'
import RiskTypeCreate from './components/RiskTypeCreate'
import InsertValue from './components/InsertValue'

Vue.config.productionTip = false

export const globalStore = new Vue({
  data: {
    pathHome:'/',
    pathRiskType:'/riskType',
    pathRiskTypeCreate:'/risktypecreate/:id',
    pathInsertDataNew:'/insertdatanew/:id',
    pathRiskTypeList:'/risktypelist',
    emitterRiskTypeFieldsList:'riskTypeFieldsList',
    emitterRiskTypeList:'riskTypeList',
  }
})

export const routes = [
	{ path: globalStore.pathHome, component: Home},
	{ path: globalStore.pathRiskType, component: RiskType},
	{ path: globalStore.pathRiskTypeCreate, component: RiskTypeCreate},
	{ path: globalStore.pathInsertDataNew, component: InsertValue},
	{ path: globalStore.pathRiskTypeList, component: RiskTypeList},    
	
]

const router = new VueRouter({
	routes
})

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'https://tomiflask1.azurewebsites.net/'
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

new Vue({
    render: h => h(App),
    router, 
}).$mount('#app')
