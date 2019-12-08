<template>
  <div class="main">
    <Sidebar/>
    <component v-for="block in getBlocksData" :key="block.blockId" :is="block.bComponent" :block="block"></component>
  </div>
</template>

<script>
import Sidebar from './Sidebar';
import { mapGetters } from 'vuex';
import Block from './Block';

export default {
  name: 'Main',
  components: {
    Sidebar,
    Block
  },
  computed: {
    ...mapGetters([
      'getBlocksData'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass" src="../media/components/main.sass"></style>
