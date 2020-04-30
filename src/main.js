import Vue from 'vue'
import 'amfe-flexible'
import './assets/js/init'
import App from './App.vue'
import router from './router'
import store from './store'
import Plugins from './plugins'
import * as Filters from './filters'
import Header from './components/Header'
import { Tabbar, TabbarItem, Toast, Lazyload, Dialog } from 'vant'

Vue.use(Plugins);
Object.keys(Filters).forEach(key => {
    Vue.filter(key, Filters[key])
});
Vue.component('Header', Header);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(Dialog);
Toast.setDefaultOptions('loading', {
    forbidClick: true,
    duration: 12000
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
