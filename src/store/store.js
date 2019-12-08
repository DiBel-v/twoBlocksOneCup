import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex)

const API_URL = 'http://localhost:3000';

export default new Vuex.Store({
    state: {
        blocksData: null,
        activeStatusYellow: false,
        activeStatusPink: false,
        yellowWidth: '100%',
        yellowHeight: '600px',
        isVisiblePink: true
    },
    mutations:{
        SET_DATA_BLOCK: (state, payload) => {
            state.blocksData = payload;
        },
        SET_ACTIVE_YELLOW: (state, payload) => {
            state.activeStatusYellow = payload;
        },
        SET_ACTIVE_PINK: (state, payload) => {
            state.activeStatusPink = payload;
        },
        SET_CHANGED_DATA: (state, payload, index) => {
            state.blocksData[index] = payload;
        },
        SET_WIDTH_YELLOW_DATA: (state, payload) => {
            state.blocksData[0].settings[0].fieldValue = payload;
            state.yellowWidth = payload;
        },
        SET_HEIGHT_YELLOW_DATA: (state, payload) => {
            state.blocksData[0].settings[1].fieldValue = payload;
            state.yellowHeight = payload;
        },
        SET_VISIBLE_PINK: (state, payload) => {
            state.isVisiblePink = payload;
        }
    },
    actions: {
        GET_DATA_BLOCK: async (context) => {
          let { data } = await Axios.get(`${API_URL}/data`)
          context.commit('SET_DATA_BLOCK', data);
        },
        SAVE_DATA_BLOCK: async (context, payload) => {
          await Axios.post(`${API_URL}/api/save`, JSON.stringify(payload));
        },
    },
    getters:{
        getBlocksData: state => state.blocksData,
        getActiveStatusYellow: state => state.activeStatusYellow,
        getActiveStatusPink: state => state.activeStatusPink,
        getWidthYellow: state => state.yellowWidth,
        getHeightYellow: state => state.yellowHeight,
        getIsVisiblePink: state => state.isVisiblePink
    },
})