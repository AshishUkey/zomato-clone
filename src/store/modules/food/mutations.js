export default {
    captureFoood(state,payload) {
      state.food = payload
    },
    captureActiveResturant(state,payload) {
      state.activeResturants = payload
    },
};