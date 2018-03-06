<template>
  <div class="container" id="app">
      <h1> Risk Types Solution</h1>
      <hr>
      <router-link :to=localvar.pathRiskType>Risk Types |</router-link>
      <router-link :to=localvar.pathHome> Home</router-link>
      <hr>
      <router-view></router-view>
  </div>
</template>

<script>

import { globalStore } from './main.js'

export default {
  name: 'app',

  components: {
  },

  data(){
    return {  
      localvar: globalStore
    }
  },

  methods:{
    }

  }

</script>

<style>
#app {
  padding-top:20px
}
</style>
