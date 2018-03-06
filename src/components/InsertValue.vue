<template>
  <div>
    <h4>Insert Value</h4>
    <hr>
    <router-link v-bind:to="'/riskTypeCreate/'+this.$route.params.id">Add field</router-link>
    <form @submit="checkForm" >
      <table>
        <tr v-for="(item, key, index) in riskType.properties">
          <td>{{key}}</td>
          <td>
            <input v-if="item['type'] == 'string'" type="text"  v-model="item['data']" required >
            <input v-if="item['type'] == 'number'" type="number"  v-model="item['data']" required>
            <input v-if="item['type'] == 'date'" type="date"  v-model="item['data']" required>
            <input v-if="item['type'] == 'radio'" type="radio"  v-model="item['data']" required>
            <input v-if="item['type'] == 'checkbox'" type="checkbox"  v-model="item['data']">
          </td>
          <td> {{item.type}} </td>
        </tr>
      </table>
      <input type="submit">  
    </form>
    
  </div>
</template>

<script>
// services
import { apiService } from '../services/apiService.ts'
import { helper } from '../services/helper.ts'

export default{
  name: 'insertData',
  data(){
    return{
      riskType:{
        id:'',
        properties:null
      },
    }
  },
  created: function(){
     this.assignFieldId()
     this.loadSchema()
  },
  methods:{
    loadSchema: function(){
       return  apiService.getSchema(JSON.stringify(this.riskType))
        .then(response=>{
          // handler for api call success
          this.riskType = response.body
          this.assignFieldId()
        })
        .catch(error=>{
          // handler for api call error
          helper.messageNotSuccessGeneral()
        })
    },
    assignFieldId: function()
    {
      this.riskType.id = this.$route.params.id
    },
    checkForm:function() {
      return  apiService.insertdataforfield(JSON.stringify(this.riskType))
        .then(response=>{        
          this.loadSchema()
          helper.messageSuccessGeneral('Data saved')
        })
        .catch(error=>{
          helper.messageNotSuccessGeneral()
        })
    },
  },
}

</script>

<style scoped>
 table, th, td {
     padding: 5px;
  }
</style>