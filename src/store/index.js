import Vue from 'vue'
import Vuex from 'vuex'

import player from './player'
import ship from './ship'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    player,
    ship
  }
})
