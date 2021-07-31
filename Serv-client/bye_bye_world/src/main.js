import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import App from './App.vue'


Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
     user: null,
     amount: false,
     noBueitems:[]
  },
  mutations: {
    userUpdate (state, payload) {
      state.user=payload
    },
    userLogout (state){
      state.user=null
      localStorage.removeItem("token")
    },
    progressBarUpdate (state, payload) {
      state.amount=payload
    },
    itemUsed(state,payload){
      state.user.Items.forEach(item =>{
        if(item.id==payload.id){
          item.UserItems.used=payload.used
        }
      })
    },
    itemsnoBueitems (state, payload){
      console.log(payload)
      let p = payload.filter(Item =>{
        let ret = true
        state.user.Items.forEach(item =>{
          if(item.id==Item.id){
            ret=false
          }
        })
        return ret
      })
      state.noBueitems=p
      console.log(p)
    }
  }
})

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
