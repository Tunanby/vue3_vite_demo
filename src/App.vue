<template>
  <div>
    <router-link to="/">home</router-link> | 
    <router-link to="/about">about</router-link>
    <router-view />
  </div>
</template>

<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
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
