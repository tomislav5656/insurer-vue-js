<template>
    <div>
      <p>Risk Type List:</p>
        <ul>
          <li v-for="(item, key, index) in this.field.properties" v-bind:value="field.value">{{key}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import { globalStore } from '../main.js'
export default{
  name: 'RiskTypeFieldsList',
  data(){
    return{
      localvar: globalStore,
      field:{
        properties:{},
      },
    }
  },
  mounted: function () { 
    this.$root.$on(this.localvar.emitterRiskTypeFieldsList, (data) => {
       // update the list populate the risk types list with new data, received from the emitter
       this.field.properties =  data
    })
  }
}

</script>

<style scoped>

</style>