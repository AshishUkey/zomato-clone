import RootComponent from '@/container/RootComponent';
import {mount} from '@vue/test-utils';
import {createStore} from 'vuex';
import foodModule from '@/store/modules/food/index';
import { axiosInstance } from '@/api/axios';

let store;

describe('Root component to hold food details page',()=>{
    beforeEach(()=>{
        store = createStore({
            module:{
                food:foodModule
            }   
        })
    });

    it('RootComponent gets loaded - with a call to getFood api',()=>{
        const wrapper = mount(RootComponent,{
            global:{
                plugins:[store],
            }
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.vm.showForm).toBe(false);
        expect(wrapper.vm.loading).toBe(true);
        expect(wrapper.vm.error).toBe(false);
        expect(wrapper.vm.errorMessage).toEqual('');
    })

    it('If api gives success result with empty data - loading stops - error remain false',async()=>{
        jest.spyOn(axiosInstance,'get').mockResolvedValue({result:'success','data':[]})
        const wrapper = mount(RootComponent,{
            global:{
                plugins:[store],
            }
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.loading).toBe(false);
        expect(wrapper.vm.error).toBe(false);
    })

    it('If api gives failed result - loading stops - error becomes true',()=>{
        
    })

    it('State of food updates from empty array to whaever comes in data part of API response',()=>{
        
    })
})