export default {
    updateLoginState(context,payload) {
        context.commit('updateLoginState',payload);    
    },
    setAuthorization(context,payload) {
        context.commit('setAuthorization',payload);    
    },
    setUserDetails(context,payload){
        context.commit('setUserDetails',payload);  
    } 
}