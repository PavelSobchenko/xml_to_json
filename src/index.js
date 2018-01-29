import 'babel-polyfill';
import Vue from 'vue';
import App from '@/components/App/App';
import VueElectron from 'vue-electron';
import store from '@/store';

Vue.use(VueElectron);

Vue.config.productionTip = false;

new Vue({
    el: '#app',

    store,

    render(createElement) {
        return createElement(App, {});
    },
});