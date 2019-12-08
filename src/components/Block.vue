<template>
  <div class="block" :class="`${block.bName}`">
    <button class="block__settings" :class="{'block__settings_active': (getActiveStatusPink && block.bName === 'pink') || (getActiveStatusYellow && block.bName === 'yellow')}" @click="setActive()" >
        Настройки
    </button>
    <p class="block__txt">{{block.bText}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Block',
  props: {
    block: Object
  },
  data() {
    return {
        isActive: false
    };
  },
  watch: {
    getWidthYellow(val){
      document.querySelector('.yellow').style.width = val;
    },
    getHeightYellow(val) {
      document.querySelector('.yellow').style.height = val;
    },
    getIsVisiblePink(val) {
      const pinkBlock = document.querySelector('.pink');
      if (val === 'true') {
        pinkBlock.style.display = 'flex';
      } else {
        pinkBlock.style.display = 'none';
      }
    }
  },
  computed: {
    ...mapGetters([
        'getActiveStatusYellow',
        'getActiveStatusPink',
        'getBlocksData',
        'getWidthYellow',
        'getHeightYellow',
        'getIsVisiblePink'
    ])
  },
  methods:{
    setActive(){
        this.isActive = !this.isActive;
        if (this.block.bName === 'yellow') {
            this.$store.commit('SET_ACTIVE_YELLOW', this.isActive)
            if (this.getActiveStatusPink && this.isActive) {
                this.$store.commit('SET_ACTIVE_PINK', !this.isActive)
            }
        } else {
            this.$store.commit('SET_ACTIVE_PINK', this.isActive)
            if (this.getActiveStatusYellow && this.isActive) {
                this.$store.commit('SET_ACTIVE_YELLOW', !this.isActive)
            }
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass" src="../media/components/block.sass"></style>