<template>
<v-container>
  <v-card>
    <v-card-title>Map your Ships: {{player}}</v-card-title>
    <v-card-text>
        <v-row>
            <v-col cols="12">
                <the-board :removeChild.sync="removeChild" :mapped.sync="mapped" :key="player"></the-board>
            </v-col>
            <v-col cols="12">
                <the-fleet :removeChild.sync="removeChild" :mapped.sync="mapped" :key="player"></the-fleet>
            </v-col>
        </v-row>
    </v-card-text>
    <v-card-actions>
        <!-- <v-btn text color="secondary" @click="reload">Reset</v-btn> -->
        <v-spacer></v-spacer>

    </v-card-actions>
  </v-card>
</v-container>
</template>

<script>
import TheBoard from '../components/TheBoard.vue'
import TheFleet from '../components/TheFleet.vue'
export default {
    components: { TheBoard, TheFleet },
    data() {
        return {
            removeChild: false,
            mapped: false,
        }
    },
    mounted() {
        this.$store.commit('ship/CLEAR_DRAGGED_SHIP')
        this.$store.commit('ship/CLEAR_SELECTED_WITH_INDEX')
        this.$store.commit('player/CLEAR_PLAYER')
        this.$store.commit('player/CLEAR_PLAYER_BOARD')
        this.$store.commit('player/SET_PLAYER','p1')
    },
    computed: {
        player() {
            return this.$store.getters['player/player']
        }
    },
}
</script>