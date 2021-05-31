<template>
    <div>
    <div class="overline">Battle Field</div>
    <v-card color="primary" class="d-flex justify-center">
        <div class='grid' :style="boardStyle" :disabled="disableBoard">
            <div v-for="(_,i) in Math.pow(gridSize,2)" :key="i" :ref="i" :data-id="i"
                @dragstart="dragStart"
                @dragover="dragOver"
                @dragenter="dragEnter"
                @dragleave="dragLeave"
                @drop="dragDrop"
                @click="fire"
            ></div>
        </div>
    </v-card>  
      <div class="overline">
            <v-btn text v-if="!gameStart" color="secondary" @click="savePlayerBoard">Done</v-btn>
      </div>
    </div>
</template>

<script>
export default {
    props: {        
        removeChild: {type: Boolean, default: false}, 
        gameStart: {type: Boolean, default: false},
        gameOver: {type: Boolean, default: false},
        opponent: {type: String, default: ''},
        startTurn: {type: Boolean, default: false},
        endTurn: {type: Boolean, default: false},
        genInfo: {type: String, default: ''},
        gridSize: {type:Number, default:10},     
    },
    computed: {
        opponentBoard() {
            return this.$store.getters['player/playerBoard']
        },
        opponentShips() {
            return this.$store.getters['player/playerShips']
        },
        boardStyle() {
            return 'margin: 2vmin; display: grid; background-color: #2962FF; grid-template-rows: repeat('+this.gridSize+',4.6vmin);grid-template-columns: repeat('+this.gridSize+',4.6vmin);'
        },
        player() {
            return this.$store.getters['player/player']
        },
        selectedShipNameWithIndex() {
            return this.$store.getters['ship/selectedShipWithIndex']
        },
        draggedShip() {
            return this.$store.getters['ship/dragged']
        },
        xNotAllowed() {
            return [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,12,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
        },
        yNotAllowed() {
            return [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
        }
    },
    data() {
        return {
            board: [],
            savePlayerBoardBtn: true,
            ships: [],
            disableBoard: false
        }
    },
    watch: {
        startTurn(val) {        
            if(val)
                this.disableBoard = false
        },
        gameStart(val) {
            if(val)
                this.disableBoard = true
        },
        opponent(val) {
            if(val != '') {                
                //load all hit and miss of the enemy's board
                for(let i=0; i < Math.pow(this.gridSize,2);i++) {                  
                    var marked = this.opponentBoard[val].find( o => o.squareId == i);
                    this.$refs[i][0].className = '';
                    if(marked) {      
                        for(let c of marked.classes){
                            if(c != undefined)
                                this.$refs[i][0].classList.add(c);
                        }
                        if(!marked.classes.includes('blend'))
                            this.$refs[i][0].classList.add('blend'); // hide all the ships                                          
                    }                   
                }                
            }
        },     
    },
    methods: {
        savePlayerBoard() {            
            this.$store.commit('player/SET_PLAYER_BOARD',this.board)
            this.$store.commit('player/SHIPS', this.ships)
            this.board = []
            this.ships = []
            if(this.player == 'p1') {
                this.$store.commit('player/SET_PLAYER','p2')
            } else if(this.player == 'p2') {
                this.$store.commit('player/SET_PLAYER','p1')
                this.$emit('update:gameStart', true)
                this.$router.push({name: 'Battlefield'}) //push the game to start
            }
        },
        dragStart() {
            console.log('drag-start')
        },
        dragOver(e) {
            e.preventDefault()
        },
        dragEnter(e) {
            e.preventDefault()
        },
        dragLeave() {
            //remove the highlight class
        },
        dragDrop(e) {          
            let dataSetId = parseInt(e.target.dataset.id) //target square id
            //gets the last div inside the (div)ship class
            let draggedShipRear = this.draggedShip.ship.lastChild.id
            //slices the div id e.g. ship0-2 returns ship0
            let shipRearClassName = draggedShipRear.slice(0,-2)
            //sub string the div id e.g index-2 returns 2
            let shipRearId = parseInt(draggedShipRear.substr(-1))

            //the id in the board where the ships rear will be placed
            //where e.target.dataset.id is the id of the board
            let shipRearBoardId = shipRearId + dataSetId

            let newXNotAllowed = this.xNotAllowed.splice(0,10*shipRearId)
            let newYNotAllowed= this.yNotAllowed.splice(0,10*shipRearId)

            //where selectedShipNameWithIndex is the part (index) of the ship that is clicked 
            this.selectedShipIndex  = parseInt(this.selectedShipNameWithIndex.substr(-1))  
            //less the selectedShipIndex to identify the last board id of the rear ship 
            shipRearBoardId -= this.selectedShipIndex
            
            let overLapping = false
            //positioning fof ship in the board 
            //horizonal
            if(this.draggedShip.position == 'x' && !newXNotAllowed.includes(shipRearBoardId)) {
                //check if the square that will be occupied is not taken by other ships
                for(let x=0; x < this.draggedShip.length; x++) {
                    let squareId       =  dataSetId - this.selectedShipIndex + x;
                    let squareElement  = this.$refs[squareId][0];            
                    if(squareElement.classList.contains('taken')){
                        overLapping = true
                        break;
                    }
                }

                if(!overLapping){
                    for(let x=0; x < this.draggedShip.length; x++) {
                        let directionClass
                        if (x === 0) directionClass = 'start'
                        if (x === this.draggedShip.length - 1) directionClass = 'end'
                        if (x === this.draggedShip.length) directionClass = ''

                        let squareId = dataSetId - this.selectedShipIndex + x;
                        let squareElement  = this.$refs[squareId][0];                    
                        squareElement.classList.add('taken','horizontal',directionClass,shipRearClassName)    
                        this.board.push({'squareId': squareId,'ship':shipRearClassName,'classes':['taken','horizontal', directionClass, shipRearClassName]});
                    }               
                }          
            //vertical
            } else if(this.draggedShip.position == 'y' && !newYNotAllowed.includes(shipRearBoardId)) {
                //check if the square that will be occupied is not taken by other ships
                for(let y=0; y < this.draggedShip.length; y++) {
                    let squareId = dataSetId - this.selectedShipIndex + this.gridSize * y;
                    let squareElement = this.$refs[squareId][0];
                    if(squareElement.classList.contains('taken')){
                        overLapping = true
                        break;
                    }
                }

                if(!overLapping){
                    for(let y=0; y <  this.draggedShip.length; y++) {
                        let directionClass
                        if (y === 0) directionClass = 'start'
                        if (y ===  this.draggedShip.length - 1) directionClass = 'end'
                        if (y ===  this.draggedShip.length) directionClass = 'end'
                        
                        let squareId = dataSetId - this.selectedShipIndex + this.gridSize * y;
                        let squareElement = this.$refs[squareId][0];
                        
                        squareElement.classList.add('taken','vertical', directionClass, shipRearClassName)
                        this.board.push({'squareId': squareId,'ship':shipRearClassName,'classes':['taken','vertical', directionClass, shipRearClassName]});
                    }                 
                }  
            } else {
                for(let z=0; z <  this.draggedShip.length; z++) {                  
                    let squareId = dataSetId - this.selectedShipIndex + z; 
                    let squareElement = this.$refs[squareId][0];  
                    if(!squareElement.classList.contains('taken')){                      
                        squareElement.classList.add('taken','single',shipRearClassName)
                        this.board.push({'squareId': squareId,'ship':shipRearClassName,'classes':['taken', shipRearClassName]});                        
                    }
                }
            }

            if(!overLapping){
                //set the player ship
                this.ships.push({'ship': shipRearClassName,'lives':this.draggedShip.length});
                //remove the dragged ship in the ship deck
                this.$emit('update:removeChild',true)
            }
        },    
        fire(e) {
            if(this.gameStart){
                //get the element in the square clicked
                let squareElement = this.$refs[e.target.dataset.id][0]
                //prevemt the player from clicking the square that is already has a class of miss or hit 
                if(squareElement.classList.contains('miss') || squareElement.classList.contains('hit')){
                    return;
                } else {
                    if(!squareElement.classList.contains('hit') && squareElement.classList.contains('taken')) {
                        squareElement.classList.add('hit')
                        this.$store.commit('player/HIT',{'opponent':this.opponent, 'id':e.target.dataset.id})
                        this.$emit('update:genInfo','Direct Hit!')
                        
                        var opponentSquare = this.opponentBoard[this.opponent].filter(o => o.squareId == e.target.dataset.id);
                        
                        let ship = this.opponentShips[this.opponent].find( o => o.ship == opponentSquare[0].ship)
                        if(ship.lives == 0) {
                            this.$emit('update:genInfo',"You sank your opponents' "+ship.ship)
                            //check for winner
                            this.winner()
                        }
                    } else {
                        squareElement.classList.add('miss')
                        this.$store.commit('player/MISS',{'squareId':e.target.dataset.id,'opponent':this.opponent, 'classes':['miss']})
                        this.$emit('update:genInfo','You Miss!')  
                    }

                    //disable the board to prevent click
                    this.disableBoard = true
                }
            }
        },
        winner() {            
            let opponentLives = this.opponentShips[this.opponent].filter(o => o.lives >= 1)
            if(opponentLives.length == 0){
                this.$emit('update:gameOver', true);
                this.$emit('update:endTurn', true)
            }
        }
    }

}
</script>

<style scoped>
.grid div {border: solid 1px #E0E0E0;opacity: 0.9;}

.taken {
    background-color: gray;
}

.single {
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
}

.taken.start.vertical,
.taken.start.vertical::before {
    border-top-left-radius: 50%;
    border-top-right-radius: 50%; 
}

.taken.end.vertical,
.taken.end.vertical::before {
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
}

.taken.start.horizontal,
.taken.start.horizontal::before {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
}

.taken.end.horizontal,
.taken.end.horizontal::before {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
}

.blend {background-color: #2962FF !important;}
.hit { background-color: red !important;}
.miss { background-color: whitesmoke !important;}


div[disabled] {
  pointer-events: none;
  opacity: 0.10;
}
</style>