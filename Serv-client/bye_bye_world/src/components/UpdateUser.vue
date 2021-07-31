<template>
  <div class="md-layout">
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-header>
        <md-progress-bar md-mode="indeterminate" v-if="$store.state.amount"></md-progress-bar>
        <div class="md-title">Users</div>
      </md-card-header>
      <md-card-content>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="name">name</label>
              <md-input
                  name="name"
                  id="name"
                  v-model="user.name"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="score">score</label>
              <md-input
                  type="number"
                  name="score"
                  id="score"
                  v-model="user.score"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="oligarch">oligarch</label>
              <md-input
                  type="number"
                  name="oligarch"
                  id="oligarch"
                  v-model="user.oligarch"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="avatar">avatar</label>
              <md-input
                  type="avatar"
                  name="avatar"
                  id="avatar"
                  v-model="user.avatar"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="password">password</label>
              <md-input
                  type="password"
                  name="password"
                  id="password"
                  v-model="user.password"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="email">email</label>
              <md-input
                  name="email"
                  id="email"
                  v-model="user.email"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-field>
              <label for="login">login</label>
              <md-input
                  name="login"
                  id="login"
                  v-model="user.login"
              />
            </md-field>
          </div>

          <md-button @click="updateUser" class="md-layout-item md-size-100">
            updateuser
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
        user:{ //user:null
          name: null,
          score: null,
          oligarch: null,
          avatar: null,
          password: null,
          email: null,
          login: null
        }
      }
    },
    created(){
      this.user.name=this.$store.state.user.name
      this.user.score=this.$store.state.user.score
      this.user.oligarch=this.$store.state.user.oligarch
      this.user.avatar=this.$store.state.user.avatar
      this.user.password=this.$store.state.user.password
      this.user.email=this.$store.state.user.email
      this.user.login=this.$store.state.user.login
    },
    methods:{
      async updateUser(){
        const head = {
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          withCredentials:true
        }
        const body={
          name: this.user.name,
          score: this.user.score,
          oligarch: this.user.oligarch,
          avatar: this.user.avatar,
          password: this.user.password,
          email: this.user.email,
          login: this.user.login
        }
        console.log(body)
        this.$store.commit('progressBarUpdate', true)
        await Axios.post('http://localhost:3000/updateuser', body, head)
        .then(result => {
          console.log(result)
          setTimeout(()=>{
            this.$store.commit('progressBarUpdate', false)
          },1000)
        })
        .catch(error => {
          console.error(error)
          this.$store.commit('progressBarUpdate', false)
        })
        await Axios.get('http://localhost:3000/getallusers', head)
        .then(result => {
          console.log(result)
          this.$emit('usersUpdate', result.data)
        })
        .catch(error => {
          console.error(error);
        })
      }
    }
  }
</script>

<style scoped>

</style>