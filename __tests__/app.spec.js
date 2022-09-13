import App from "../src/App.vue";
import {mount} from '@vue/test-utils'
describe('My first test for app component',()=>{
    it('App mounts successfully',()=>{
        const wrapper = mount(App);
        expect(wrapper.exists()).toBe(true)
    })
})