<template>
  <div id="main">
  <Main/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from './store'
import Main from './components/Main.vue'

export default defineComponent({
  name: 'App',
  components: {
    Main
  },
  created () {
    let localTodos = localStorage.getItem('todos')
    if (localTodos) {
      localTodos = JSON.parse(localTodos)
      store.commit('setTodos', localTodos)
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
