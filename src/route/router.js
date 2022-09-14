import {routes} from './routes'

import { createRouter , createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes:[...routes]
})


router.beforeEach(function(to,from,next){
    console.log("Global gaurd for each")
    console.log(from);
    console.log(to);
    next();
})

router.afterEach(function(to,from){
    console.log(from);
    console.log(to);
})

export default router;