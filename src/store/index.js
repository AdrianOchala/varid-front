import Vue from 'vue'
import Vuex from 'vuex'
import dogs from './dogs'; 
import modal from './modal'; 

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        dogs,
        modal
    }
})
