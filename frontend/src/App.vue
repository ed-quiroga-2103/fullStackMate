<template>
  <div>
    <NavBar class=""/>
    <div id="app" class="bg-dark-custom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import NavBar from './components/navigation/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data(){
    return {
    }
  }
}
</script>


<style>
@import './assets/css/main.css';

html, body{
  background-color: #283747;
  width: 100%;
  min-height: 100%;
  height: 100%;

}

</style>
