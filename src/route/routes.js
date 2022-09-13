
import RootComponent from "../container/RootComponent.vue";
import FoodComponent from "../container/FoodComponent.vue";
import RestuarantDetail from "../components/RestuarantDetail"
import RestuarantListContainer from "../components/RestuarantListContainer";

const routes = [
    {
        path:'/',
        name:'landing',
        components:{ default: RootComponent}
    },
    {
        path:'/food',
        name:'food',
        component:FoodComponent
    },
    {path:'/resturants/:timingCode',name:'resturants',component:RestuarantListContainer, props: true},
    {path:'/resturant/:code',name:'foodDetails',component:RestuarantDetail, props: true},
    {path:'/:catchAll(.*)',component:<h1>Not a valid link</h1> }

]

export {routes};
