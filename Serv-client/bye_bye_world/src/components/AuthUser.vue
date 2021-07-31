<template>
  <div class="md-layout">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <div class="md-title">Users</div>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="first-name">First Name</label>
              <md-input 
                name="first-name" 
                id="first-name" 
                v-model="user.name"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="password">Password</label>
              <md-input 
                name="password" 
                id="password" 
                v-model="user.password"
              />
            </md-field>
          </div>
          <md-button @click="loginAuth" class="md-layout-item md-size-100">
            auchuser
          </md-button>
        </div>  
      </md-card-content>      
    </md-card>
  </div>
</template>
<script>
  import Axios from 'axios'
  export default {
    name: "ListUsers",
    data(){
      return{
        user:{
          name: null,
          password: null,
          token: null
        }
      }
    },
    methods:{
      async loginAuth(){
        console.log(this.user)
        const head = {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          withCredentials:true
        }
        const body={
          login: this.user.name,
          password: this.user.password
        }
        await Axios.post('http://localhost:3000/loginauth', body, head)
        .then(async result => {
          console.log(result)
          this.$store.commit('userUpdate', result.data)
          localStorage.setItem('token', result.data.token)
          await Axios.get('http://localhost:3000', head)
          .then(res => {
            this.$store.commit('itemsnoBueitems',res.data)
            //this.$emit('usersUpdate', result.data)
          })
          .catch(error => {
            console.error(error);
          })
        })
        .catch(error => {
          console.error(error);
        })
      }
    }
  }
</script>
<style>
</style>