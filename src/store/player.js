const state = {
    player: '',    
    playerBoard: {},
    playerShips: {}
};

const getters = {
    player: state => state.player,
    playerBoard: state => state.playerBoard,
    playerShips: state => state.playerShips
};

const actions = {

};

const mutations = {
    SET_PLAYER: (state,player) => {        
        state.player = player
    },
    CLEAR_PLAYER: (state) => {
        state.player = ''
    },
    SET_PLAYER_BOARD: (state, playerBoard) => {
        state.playerBoard[state.player] = playerBoard

        console.log(state.playerBoard)
    },
    CLEAR_PLAYER_BOARD: (state) => {
        state.playerBoard[state.player] = {}
    },
    HIT: (state,hit) => {
        var boom = state.playerBoard[hit.opponent].find( o => o.squareId == hit.id);
        boom.classes.push('hit')
        //minus 1 to ships lives
        let ship = state.playerShips[hit.opponent].find( o => o.ship == boom.ship);
        ship.lives--;
    },
    MISS: (state, miss) => {
        state.playerBoard[miss.opponent].push({'squareId':miss.squareId,'classes':miss.classes});    },
    SHIPS: (state,ships) => {
        state.playerShips[state.player] = ships        
    } 
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}