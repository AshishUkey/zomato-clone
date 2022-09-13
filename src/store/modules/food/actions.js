export default {
    captureFoood(context,payload) {
      context.commit('captureFoood',payload);    
    },
    captureRecord(state){
      console.log("Am in food module")
      console.log(state)
    },
    captureActiveResturant(context,payload) {
      context.commit('captureActiveResturant',payload);  
    },
  }