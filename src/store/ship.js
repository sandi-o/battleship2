const state = {
    selectedShipWithIndex: null,
    dragged: {},
};

const getters = {
    selectedShipWithIndex: state => state.selectedShipWithIndex,
    dragged: state => state.dragged
};

const actions = {

};

const mutations = {
    SET_SELECTED_WITH_INDEX: (state,selectedShipWithIndex) => {        
        state.selectedShipWithIndex = selectedShipWithIndex
    },
    CLEAR_SELECTED_WITH_INDEX: (state) => {
        state.selectedShipWithIndex = null
    },
    SET_DRAGGED_SHIP: (state, draggedShip) => {
        state.dragged = draggedShip
    },
    CLEAR_DRAGGED_SHIP: (state) => {
        state.dragged = {}
    } 
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}