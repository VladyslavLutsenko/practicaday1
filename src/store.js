import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        count: 0,
        theme: '1'
    },
    getters: {
        getCount: (state) =>{
            return state.count
        },
        getTheme: (state) =>{
            return state.theme
        }
    },
    mutations: {
        setCount: (state, c)=> state.count=c,
        setTheme: (state, t)=> state.theme=t,
    },
    actions: {},
});
export default store