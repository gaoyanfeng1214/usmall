import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

// import {actions} from "../store/actions"
// import {state,mutations,getters} from '../store/mutations'
import menu from "./modules/menu"
import role from "./modules/role"
import cate from "./modules/cate"
import spces from "./modules/spces"

export const state ={

}

export const mutations={

}

export const actions={

}

export const getters={

}

// 导出
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        menu,
        role,
        cate,
        spces
    }
})