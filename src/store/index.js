import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const handleStore = store => {
    if (localStorage.store) store.replaceState(JSON.parse(localStorage.store));
    store.subscribe((mutation, state) => {
        localStorage.setItem("store",  JSON.stringify(state))
    })
};

export default new Vuex.Store({
    state: {
        token: '',
        userInfo: '',
        isBack: false,
        tradersInfo: {},
    },
    mutations: {
        ['SET_TOKEN'](state, data) {
            state.token = data;
        },
        ['SET_USER_INFO'](state, data) {
            state.userInfo = data;
        },
        ['SET_IS_BACK'](state, Boolean) {
            state.isBack = Boolean;
        },
        ['SET_TRADERS_INFO'](state, data) {
            state.tradersInfo = data;
        }
    },
    plugins: [handleStore]
})
