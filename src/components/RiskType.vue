<template>
  <div>
  <form @submit="checkForm" >
  <div>
    Risk Type Name: <input v-model="riskType.name" required></input>
     <input type="submit"></input>
  </div>
  </form>
  <hr>
   <risk-type-list></risk-type-list>
  </div>
</template>

<script>
// components
import RiskTypeList from'./RiskTypeList' // component for listing other risk types entere by user
// global constants
import { globalStore } from '../main.js'
// services
import { apiService } from '../services/apiService.ts'
import { helper } from '../services/helper.ts'


export default{
   components: {
    'risk-type-list':RiskTypeList
  },
  name: 'riskType',
  data(){
    return{
      localvar: globalStore,
      riskType: {
        name:'',
        properties:{}
      }
    }
  },
  created: function(){
    
  },
  methods:{
    checkForm: function(){
      this.setRiskTypes() 
    },
    setRiskTypes: function(){
        // send the api call for new risk Type entered by the user
      return  apiService.setRiskTypes(JSON.stringify(this.riskType))
      .then(response=>{
        this.$root.$emit(this.localvar.emitterRiskTypeList, response.body) // emitter for changes in risk type list
        helper.messageSuccessGeneral('Risk type saved') // we can handle text with constants or translations
      })
      .catch(error=>{
        // handling the errors
        helper.messageNotSuccessGeneral()
      })
    },
  } 
}
</script>

<style scoped>
  table, th, td {
     border: 1px solid black;
     padding: 5px;
  }
</style>s