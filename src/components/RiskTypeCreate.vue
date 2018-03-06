<template>
  <div>
    <h4>Risk Type Create Fields</h4>
  <hr>
  <router-link v-bind:to="'/insertdatanew/'+$route.params.id">Insert Record</router-link>
  <hr>
  <form @submit="insertNewField" >
    <div>
          Field: 
          <input v-model="field.name" required></input>
          Type: 
          <select v-model="field.type.type" required>
          <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
          </select>
     <input type="submit"></input>
    </div>
  </form>
    <fields-for-risktype></fields-for-risktype>
  </div>
</template>

<script>
import RiskTypeFieldsList from './RiskTypeFieldsList'
import { globalStore } from '../main.js'
// services
import { apiService } from '../services/apiService.ts'
import { helper } from '../services/helper.ts'

export default{

  components: {
    'fields-for-risktype':RiskTypeFieldsList // inserted fields list for specific risk type
  },
  name: 'RiskTypeCreate',
  data(){
    return{
      localvar: globalStore,
      selected: '',
      options: [
                { text: 'string', value: 'string' },
                { text: 'number', value: 'number' },
                { text: 'date', value: 'date' },
                { text: 'checkbox', value: 'checkbox' }
              ],
      field:{
        id:'',
        schema: {"type":"object"},
        properties:{},
        type:{
          type:''
        }
      },
      fields:[],
    }
  },
  created: function(){
     this.assignFieldId()
     this.loadSchema()
  },
  methods:{
    loadSchema: function(){
       return  apiService.getSchema(this.fieldToJson())
        .then(response=>{
          this.emitChanges(this.fromApiToLocalModel(response))
        })
        .catch(error=>{
          helper.messageNotSuccessGeneral()
        })
    },
    fieldToJson: function()
    {
      return JSON.stringify(this.field)
    },
    assignFieldId: function()
    {
      this.field.id = this.$route.params.id
    },
    insertNewField: function(){  
      this.addFieldToProps()

      return  apiService.insertNewField(JSON.stringify(this.field))
      .then(response=>{        
        this.emitChanges(this.fromApiToLocalModel(response))
        helper.messageSuccessGeneral('Field saved')
       })
      .catch(error=>{
        helper.messageNotSuccessGeneral()
      })
    },
    fromApiToLocalModel: function(apiObject){
      return this.field.properties =  apiObject.body.properties
    },
    addFieldToProps: function(){
      this.$set(this.field.properties, this.field.name, this.field.type)
    },
    emitChanges:function(result){
      this.$root.$emit(this.localvar.emitterRiskTypeFieldsList, result)
    }
  }
}

</script>

<style scoped>

</style>