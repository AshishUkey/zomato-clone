import { createStore } from 'vuex';
import foodModule from './modules/food';
import authenticationModule from './modules/authentication';

const store = createStore({
  modules:{
    food:foodModule,
    authentication:authenticationModule,
  }
});

export default store;