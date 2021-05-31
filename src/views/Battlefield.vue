<template>
<v-container>
  <v-card>
    <v-card-title>
      {{genInfo}}      
      <v-spacer></v-spacer>
      {{turnInfo}}
    </v-card-title>
    <v-card-text>
        <v-row>
            <v-col cols="12">
                <the-board 
                  :gameStart.sync="gameStart"
                  :gameOver.sync="gameOver"
                  :startTurn.sync="startTurn"
                  :endTurn.sync="endTurn"
                  :opponent.sync="opponent"
                  :genInfo.sync="genInfo"
                ></the-board>
            </v-col>      
        </v-row>
    </v-card-text>
    <v-card-actions>
        <v-btn  color="primary" :disabled="startTurn" @click="setOpponent">Start Turn</v-btn>        
        <v-spacer></v-spacer>
        <v-btn  color="accent" :disabled="endTurn" @click="nexPlayer">End Turn</v-btn>
    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
import TheBoard from '../components/TheBoard.vue'

export default {
  components: {TheBoard},
  data() {
    return {
      opponent: '',
      startTurn: false,
      endTurn: true,
      genInfo: '',
      turnInfo: '',
      gameOver: false,
      gameStart: true,
    }
  },
  computed: {
    player() {
      return this.$store.getters['player/player']
    },     
  },
  watch: {
    player(val){
      this.turnInfo = val+"'s Turn"
    },
    gameOver(val) {
      if(val) {
        this.genInfo = 'Game Over'
      }
    }
  },
  mounted() {
    this.genInfo = "Game Start!"    
  },
  methods: {
    setOpponent() {      
      if(this.player == 'p1') this.opponent = 'p2'
      if(this.player == 'p2') this.opponent = 'p1'
      this.startTurn = true
      this.endTurn = false
    },
    nexPlayer() {      
      if(this.player == 'p1') this.$store.commit('player/SET_PLAYER','p2')
      else if(this.player == 'p2') this.$store.commit('player/SET_PLAYER','p1')
      this.startTurn = false
      this.endTurn = true
    }
  }
}
</script>

<style>

</style>