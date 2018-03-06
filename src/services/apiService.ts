import Vue from 'vue'

export default class ApiService {

  getRiskTypes()
  {
    return Vue.http.get(apiRoutes.getSetRiskType)
  }

  setRiskTypes(data)
  {
    return this.apiCall(apiRoutes.getSetRiskType, data)
  }

  getSchema(data)
  {
    return this.apiCall(apiRoutes.getschema, data)
  }

  insertNewField(data)
  {
    return this.apiCall(apiRoutes.addfield, data)
  }

  deleteRiskType(data)
  {
    return this.apiCall(apiRoutes.deleteRiskType, data)
  }
  insertdataforfield(data)
  {
    return this.apiCall(apiRoutes.insertdataforfield, data)
  }

  apiCall(url, data)
  {
    return Vue.http.post(url, data,{ headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
  }
}

export const apiRoutes = new Vue({
  data: {
    getSetRiskType:'getSetRiskType',
    getschema:'getschema',
    addfield:'addfield',
    deleteRiskType:'deleteRiskType',
    insertdataforfield:'insertdataforfield'
  }
})

export const apiService = new ApiService();