<template>
    <div>
    <div class="overline">Ship Deck</div>
    <v-card color="info" class="d-flex justify-center">       
        <div class='ship-container d-flex' ref="grid-display">
            <div v-for="(v,i) in ships " :key="i" 
                :style="shipAlignment(v.length,v.position)"
                draggable="true"
                @dragstart="dragStart"
                @mousedown="mouseDown"
                :data-position='v.position'
                class="ship d-flex flex-wrap"                                
            >
                <div v-for="x in v.length" :key="(x-1)" :id="`ship${i}-${x-1}`"></div>
            </div>
        </div>
    </v-card>
    </div>
</template>

<script>
export default {
    props: {
        removeChild: {type: Boolean, default: false},
        gameStart: {type: Boolean, default: false},
        gridSize: {type:Number, default:10},
        ships: {type: Array, default: () =>  [
            {'length': 1, 'position':'z','damage':0,'sank':0},
            {'length': 1, 'position':'z','damage':0,'sank':0},
            {'length': 2, 'position':'x','damage':0,'sank':0},
            {'length': 3, 'position':'x','damage':0,'sank':0},
            {'length': 4, 'position':'x','damage':0,'sank':0},
            {'length': 2, 'position':'y','damage':0,'sank':0},
            {'length': 3, 'position':'y','damage':0,'sank':0},
            {'length': 4, 'position':'y','damage':0,'sank':0},        
        ]}
    },
    watch: {
        removeChild(val) {
            if(val){
                this.$refs['grid-display'].removeChild(this.draggedShip.ship)
                this.$store.commit('ship/CLEAR_DRAGGED_SHIP')
                this.$emit('update:removeChild',false)   
            }
        }
    },
    computed: {
        draggedShip() {
            return this.$store.getters['ship/dragged']
        },
    },
    methods: {
        dragStart(e) {
            this.$store.commit('ship/SET_DRAGGED_SHIP',{
                'ship': e.target, //the ship container div
                'length': e.target.childNodes.length, //how long or how many div is inside the ship container being dragged 
                'position': e.target.dataset.position, //check if the ship position is horizontal or vertical            
            })
        },
        mouseDown(e) {
            this.$store.commit('ship/SET_SELECTED_WITH_INDEX',e.target.id)
        },
        shipAlignment(len,pos){
            if(pos == 'x') {
                return '--width:'+len+';';
            } else if(pos == 'y'){
                return '--height:'+len+';--width:1;';
            } else 
                return ''
        }
    }
}
</script>

<style scoped>
.ship-container {
    margin: 2vmin;
    background-color: #2962FF;
}

.ship > div {
  width: 4.6vmin;
  height: 4.6vmin;
}

.ship {
    margin: 1vmin;
    background-color: gray;
    border-radius: 2.3vmin;
    width: calc(4.6vmin * var(--width,1));
    height: calc(4.6vmin * var(--height,1));
}

</style>