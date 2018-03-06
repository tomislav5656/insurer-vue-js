<template>
  <div>
  <div style="color:red" v-if="this.riskType.length==0 && this.loading==false">
    There is no risk types. Please create one !
  </div>
  <p v-if="this.riskType.length!=0 && this.loading==false">Risk Type List:</p>
  <table >
    <tr v-for="riskType in riskType">
      <td>{{riskType.name}}</td>
      <td> 
        <router-link v-bind:to="'/riskTypeCreate/'+riskType.id">
          Add field
        </router-link>
      </td>
      <td>
        <router-link v-bind:to="'/insertdatanew/'+riskType.id">
          Insert Record
        </router-link>
      </td>
      <td>
        <button @click="deleteRiskType(riskType)">Delete</button> 
      </td>
    </tr>
  </table>
  </div>
</template>

<script>

import { globalStore } from '../main.js'
// services
import { apiService } from '../services/apiService.ts'
import { helper } from '../services/helper.ts'
// model converting example with class
import { RiskType } from '../models/RiskType.ts' 

export default{
  name: 'RiskTypeList',
  data(){
    return{
      localvar: globalStore,
      loading : true,
      riskType : RiskType
    }
  },
  created: function(){
    this.getRiskTypes()
  },
  mounted: function () { 
    this.$root.$on(this.localvar.emitterRiskTypeList, (data) => {
       // update the list populate the risk types list with new data, received from the emitter
       this.riskType = data.map(a=> new RiskType(a)) // example for mapping with mapper
    })
  },
  methods:{
    getRiskTypes: function(){
      return apiService.getRiskTypes()
      .then(response=>{
        this.loading = false;
        this.riskType = response.body.map(a=> new RiskType(a))
      })
      .catch(error=>{
        helper.messageNotSuccessGeneral()
      })
    },
    deleteRiskType:function(riskType){
      // api call to server to delete specific risk type
      return  apiService.deleteRiskType(JSON.stringify(riskType))
      .then(response=>{     
         this.riskType = response.body.map(a=> new RiskType(a))
         helper.messageObjectDeleted('Selected object successfully removed')
      })
      .catch(error=>{
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