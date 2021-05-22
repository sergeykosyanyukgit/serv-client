<template>
  <div>
    <div v-if="$store.state.user && $store.state.user.Items" 
      class="md-layout"
    >
      <md-card  
        class="md-layout-item md-size-50 md-small-size-100" 
        v-for="item in $store.state.user.Items" :key="item.id"
      >
        <md-card-header>
          {{item.name}}
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              cost:{{item.cost}}
            </div>
            <div class="md-layout-item md-size-100">
              image:{{item.image}}
            </div>
            <div class="md-layout-item md-size-100">
              speed:{{item.speed}}
            </div>
            <div class="md-layout-item md-size-100">
              damage:{{item.damage}}
            </div>
            <div class="md-layout-item md-size-100">
              shield:{{item.shield}}
            </div>
            <div class="md-layout-item md-size-100">
              <md-button :disabled="item.UserItems.used" @click="updateShopItems(item.id,true)">
                put on
              </md-button>
              <md-button :disabled="!item.UserItems.used" @click="updateShopItems(item.id,false)">
                put off
              </md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div v-if="$store.state.user && $store.state.noBueitems" 
      class="md-layout"
    >
      <md-card  
        class="md-layout-item md-size-50 md-small-size-100" 
        v-for="item in $store.state.noBueitems" :key="item.id"
      >
        <md-card-header>
          {{item.name}}
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
              cost:{{item.cost}}
            </div>
            <div class="md-layout-item md-size-100">
              image:{{item.image}}
            </div>
            <div class="md-layout-item md-size-100">
              speed:{{item.speed}}
            </div>
            <div class="md-layout-item md-size-100">
              damage:{{item.damage}}
            </div>
            <div class="md-layout-item md-size-100">
              shield:{{item.shield}}
            </div>
            <div class="md-layout-item md-size-100">
              <md-button class="md-primary" @click="bueShopItems(item.id)">
                bue
              </md-button>
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>    
<script>
import Axios from 'axios'
export default {
  name: "ShopItems",
  data(){
    return{
      items:[

      ]
    }
  },
  async created(){
    const head = {
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin': '*',
      withCredentials:true
    }
    await Axios.get('http://localhost:3000', head)
    .then(result => {
      console.log(result)
      this.items=result.data
      //this.$store.commit('itemsnoBueitems',this.items)
      //this.$emit('usersUpdate', result.data)
    })
    .catch(error => {
      console.error(error);
    })
  },
  methods:{
    async updateShopItems(ItemId,status){
      const head = {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        withCredentials:true
      }
      await Axios.post('http://localhost:3000/useruseitem',{ItemId:ItemId,status:status}, head)
      .then(result => {
        console.log(result)
        this.$store.commit('itemUsed', {
          id:ItemId,
          used:status
        })
        //this.items=result.data
        //this.$emit('usersUpdate', result.data)
      })
      .catch(error => {
        console.error(error);
      })
    },
    async bueShopItems(ItemId){
      const head = {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        withCredentials:true
      }
      await Axios.post('http://localhost:3000/userbuyitem',{ItemId:ItemId}, head)
      .then(result => {
        console.log(result)
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