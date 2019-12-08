<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
      this.$store.dispatch('GET_DATA_BLOCK');
  }
}
</script>

<style lang="sass">
  html, body
    margin: 0
    padding: 0
    height: 100%
</style>
