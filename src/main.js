import * as Vue from 'vue'; 
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import App from './App.vue'
import router from './route/router';
import store from "./store/index";

const app = Vue.createApp(App);
app.use(store);
app.use(BootstrapVue3);
app.use(router);

app.mount('#app')
