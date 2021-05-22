<template>
  <div id="app">
    <AuthUser
      class="authPanel"
      v-if="this.$store.state.user==null"
    />
    <div v-else>
      <md-button class="exitButton" @click="$store.commit('userLogout')">
        logout
      </md-button>
      <UpdateUser
        @usersUpdate="(data)=>users=data"
      />
    </div>
    <ShopItems

    />
    <ListUsers
      :Users="users"
    />
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script>
import UpdateUser from './components/UpdateUser'
import Axios from 'axios'
import ListUsers from './components/ListUsers.vue'
import AuthUser from './components/AuthUser.vue'
import ShopItems from './components/ShopItems.vue'
export default {
  name: 'App',
  components: {
    ListUsers,
    AuthUser,
    UpdateUser,
    ShopItems
  },
  data(){
    return{
      users:[]
    }
  },
  async created(){
    const head = {
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    await Axios.get('http://localhost:3000/getallusers', head)
    .then(result => {
      console.log(result)
      this.users=result.data
    })
    .catch(error => {
      console.error(error);
    })
    if(this.$store.state.user==null){
      if(localStorage.getItem("token")){
        await Axios.get('http://localhost:3000/auth', {token:localStorage.getItem("token")},head)
        .then(result => {
          console.log(result)
          this.$store.commit('userUpdate', result.data)
        })
        .catch(error => {
          console.error(error);
        }) 
      }
      else{
        console.error('error(no token in localStorage)')
      }
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .authPanel{
    width: 20%;
    float: right;
  }
  .exitButton{
    float: right;
    margin: 0px 100px;
  }
</style>
