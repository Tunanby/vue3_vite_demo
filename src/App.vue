<template>
  <div class="main">
    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Nav from './components/nav.vue'

export default defineComponent({
  name: 'App',
  components: {
    Nav
  }
});
</script>

<style lang="scss" scoped>
html, body, #app, .main {
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
