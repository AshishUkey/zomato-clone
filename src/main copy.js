import * as Vue from 'vue' 
// import { createApp } from 'vue';
// import * as Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from './App.vue'
import router from './route/router';

// import api from './api/axios'

// Vue.config.productionTip = false;

// import api from './services/api'

// Vue.config.productionTip = false;
// Vue.prototype.$http = api; 
// api.defaults.timeout = 10000;


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

const app = Vue.createApp(App)

// Vue.prototype.
// Vue.prototype.$http = api;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("BEFOR REQUEST")
    return config;
  }, function (error) {
    // Do something with request error
    console.log("BEFOR REQUEST ERROR")
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("BEFOR RESPONSE")
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("BEFOR RESPONSE ERROR")
    return Promise.reject(error);
});

//app.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
app.use(BootstrapVue3)
app.use(router);
app.use(VueAxios, axios)

app.mount('#app')
