<template>
  <div>
    <div class="md-layout md-layout-tab">
      <div 
        v-for="(User, index) in Users" 
        :key="index" 
        class="user md-layout-item"
      >
        <img 
          :src="User.avatar" 
          alt="no_avatar" 
          class="avatar"
        />
        {{User.name}} 
        score:{{User.score}} 
        donate:{{User.oligarch}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ListUsers",
    props:{
      Users:{
        type: Array
      }  
    }
  }
</script>
<style>
  .user{
    border: 1px solid gray;
  }
  .user img{
    border-right: 1px solid gray;
  }
  .avatar{
    width: 100px;
  }
  .md-layout-tab{
    width: 80%;
    float: left;
  }
</style>