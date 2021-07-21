<template>
  <div class="home" style="">
    Home Page
    <div>{{ store.state.message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const girls = ref(["大脚", "刘英", "晓红"]);
    
    return { store, girls };
  },
  asyncData({ store }) {
    return store.dispatch('fetchMessage');
  },

});
</script>

<style lang="scss" scoped>
  .home {
    font-size: 34px;
  }
</style>
