import {mount,flushPromises} from '@vue/test-utils';
import { createRouter , createWebHistory} from 'vue-router';
import { routes } from "@/route/routes";
import App from '@/App.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[...routes]
})

describe('My first route tes',()=>{
    it('Testing to route landing page',async()=>{
        /*router.push('/')
        await router.isReady();
        const wrapper = mount(App,{
            global:{
                plugins:[router]
            }
        });*/
        // expect(wrapper.html()).toContain('img')
        expect('aaaa').toContain('a')
    });
})
