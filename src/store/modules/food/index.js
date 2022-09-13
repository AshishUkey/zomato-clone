import foodActions from "./actions";
import foodGetters from "./getters";
import foodMutations from "./mutations";

const foodModule = {
    namespaced:true,
    state() {
      return {
        food:[],
        foodCategories:[
          {
            'name':'Breakfast',
            'timing':'8:00 to 11:00 '
          },
          {
            'name':'Lunch',
            'timing':'12:00 to 14:00 '
          },
          {
            'name':'Dinner',
            'timing':'19:00  to 21:00 '
          }
        ],
        activeResturants:[]
      };
    },
    mutations: foodMutations,
    actions: foodActions,
    getters: foodGetters,
}

export default foodModule;