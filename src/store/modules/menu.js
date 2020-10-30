// menu页请求回来的数据全都放到store中

// 菜单列表数据
import {reqMenuList} from "../../util/request"

// 拿到一条数据
import {reqMenuEdit} from "../../util/request"

// 存放数据
const state = {
    menuList:[]
};

const mutations = {
    changeMenuList(state,arr){
        state.menuList = arr;
    }
};


const actions={
    requestMenuList(context){
        // axios请求
        reqMenuList({istree:true}).then((res)=>{
            console.log(res.data.list)
            context.commit('changeMenuList',res.data.list)
        })
       
    }
};

const getters = {
    menuList(state){
        return state.menuList;
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
};