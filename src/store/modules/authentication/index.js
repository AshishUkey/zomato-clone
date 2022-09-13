import authenticationActions from "./actions";
import authenticationGetters from "./getters";
import authenticationMutations from "./mutations";

const foodModule = {
    namespaced:true,
    state() {
      return {
        loggedIn:false,
        authorization:null,
        userDetails:null,
      };
    },
    mutations: authenticationMutations,
    actions: authenticationActions,
    getters: authenticationGetters,
}

export default foodModule;