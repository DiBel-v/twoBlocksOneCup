<template>
  <div class="sidebar" v-show="getActiveStatusYellow || getActiveStatusPink">
    <div class="sidebar__head">
      <p class="sidebar__head_settings">Настройки</p>
      <button class="sidebar__head_save" @click="saveCurrentData()">Сохаринть</button>
      <button class="sidebar__head_exit" @click="exit()">X</button>
    </div>
    <div class="sidebar__fields">
      <div class="sidebar__fields_yellow" v-show="getActiveStatusYellow" ></div>
      <div class="sidebar__fields_pink" v-show="getActiveStatusPink" ></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Sidebar',
  data(){
    return{
      isOpen: true,
      yellowSettings: [],
      pinkSettings: [],
      widthYellow: '',
      heightYellow: '',
      selectOption: false
    };
  },
  watch: {
    getBlocksData: function() {
      this.getSett();
    }
  },
  computed:{
    ...mapGetters([
        'getActiveStatusYellow',
        'getActiveStatusPink',
        'getBlocksData'
      ])
  },
  methods: {
    exit(){
      this.isOpen = false;
      if(this.getActiveStatusYellow){
        this.$store.commit('SET_ACTIVE_YELLOW', this.isOpen)
      } else if(this.getActiveStatusPink){
        this.$store.commit('SET_ACTIVE_PINK', this.isOpen)
      }
    },
    saveCurrentData() {
      this.$store.dispatch('SAVE_DATA_BLOCK', this.getBlocksData);
    },
    getSett() {
      this.getBlocksData.forEach(element => {
          if (element.bName === 'yellow'){
            this.yellowSettings = element.settings;
          } else {
            this.pinkSettings = element.settings;
          }
      })
      const parentYellow = document.getElementsByClassName('sidebar__fields_yellow')[0];
      const parentPink = document.getElementsByClassName('sidebar__fields_pink')[0];
      this.yellowSettings.forEach(item => {
        const tag = `<label style="color: #384f9b; font-weight: 400;">${item.Name}</label>
                    <${item.filedType} type="int" v-model="${item.fieldValue}" value="${item.fieldValue}" style="line-height: 30px; width: 100px; color: #384f9b; border: 2px solid #384f9b;">`;
        this.$watch(item.filedType);
        parentYellow.innerHTML += tag;
      });
      this.pinkSettings.forEach(item => {
        const tag = `<label style="color: #384f9b; font-weight: 400;">${item.Name}</label>
                    <${item.fieldType} v-model="${item.fieldValue}" value="${item.fieldValue}" style="line-height: 30px; width: 100px; color: #384f9b; border: 2px solid #384f9b;">
                      <${item.secondFieldType} value="${item.options[0].value}" selected>${item.options[0].text}</${item.secondFieldType}>
                      <${item.secondFieldType} value="${item.options[1].value}">${item.options[1].text}</${item.secondFieldType}>
                    </${item.filedType}>`;
        parentPink.innerHTML += tag;
      });
      const vm = this;
      document.querySelector('input').addEventListener('input', function (evt) {
        this.widthYellow = evt.target.value;
        vm.$store.commit('SET_WIDTH_YELLOW_DATA', this.widthYellow);
      });
      document.querySelectorAll('input')[1].addEventListener('input', (evt) => {
        this.heightYellow = evt.target.value;
        this.$store.commit('SET_HEIGHT_YELLOW_DATA', this.heightYellow);
      });
      document.querySelector('select').addEventListener('change', (evt) => {
        this.$store.commit('SET_VISIBLE_PINK', evt.target.value);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass" src="../media/components/sidebar.sass"></style>