<template>
  <div class="hello">
  <div class="button">
   Hello
  </div>
    <h1>{{ num }}</h1>
    <h1>{{ msg }}</h1>    
    <div v-if="num>10">
      Helloworld
    </div>
    <div v-else>
      Ворд онлайн
    </div>
    <md-button 
      class="md-primary"
      @click="showDialog=true"
    >
      Primary
    </md-button>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>
        Preferences
      </md-dialog-title>
      <template slot="body">
        <div class="md-layout">
          <div class="md-layout-item">
            hello
          </div>
        </div>
      </template>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
  name: "HelloWorld",
  props: {
    msg: String,
    num: Number
  },
  data(){
    return{
      btmColor: 'gray',
      showDialog: false
    }  
  },  
  methods: {
    btnClickFunction(){
      if(this.btmColor=='gray'){
        this.btmColor='green'
      }else if(this.btmColor=='green'){
        this.btmColor='red'
      }else if(this.btmColor=='red'){
        this.btmColor='gray'
      }
    } 
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
