export default {
    updateLoginState(state,payload) {
        state.loggedIn = payload
    },
    setAuthorization(state,payload){
        state.authorization = payload
    },
    setUserDetails(state,payload){
        state.userDetails = payload
    }  
};