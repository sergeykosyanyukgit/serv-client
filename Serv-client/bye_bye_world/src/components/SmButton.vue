<template>
  <div>
    <div 
      class="button"
      :class="[
        {'gray':color=='gray'},
        {'green':color=='green'},
        {'red':color=='red'}
      ]"
      @click="$emit('btnClick')"
    >
      {{text}}
    </div>
  </div>
</template>
<script>
  export default {
    name: "SmButton",
    props:{
      color:{
        type: String,
        default: 'gray'
      },
      text:{
        type: String,
        default: 'button'
      }  
    }
  }
</script>
<style scoped>
  .button{
    cursor:pointer;
    display: inline-block;
    padding: 10px 13px;
    margin: 1em 0.5em;
    border-radius: 5px;
    color: #fafafa;
    user-select: none;
    transition: background-color 0.5s;
  }
  .button:hover{
    transition: background-color 0.5s;
  }
  .button:active{
    transition: background-color 0s;
  }
  .gray{
    background-color: #B2B2B2;
  }
  .gray:hover{
    background-color: #565656;
  }
  .gray:active{
    background-color: #3A3A3A;
  }


  .green{
    background-color: #3DFF00;
  }
  .green:hover{
    background-color: #239100;
  }
  .green:active{
    background-color: #135100;
  }


  .red{
    background-color: #FF0000;
  }
  .red:hover{
    background-color: #8F0000;
  }
  .red:active{
    background-color: #4C0000;
  }
</style>