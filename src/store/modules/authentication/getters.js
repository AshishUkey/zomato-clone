export default {
    isLoggedIn(state) {
        return state.loggedIn;
    },
    authorizations(state) {
        return state.authorization;
    },
    userDetails(state) {
        return state.userDetails;
    },
}