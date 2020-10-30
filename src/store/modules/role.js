import {reqRoleList} from "../../util/request"

const state = {
    roleData:[]
}

const mutations = {
    changeRoleData(state,arr){
        state.roleData = arr;
    }
}

const actions = {
    requestRoleAdd(context){
        reqRoleList().then((res)=>{
            console.log(res.data.list)
            context.commit("changeRoleData",res.data.list)
        })
    }
}

const getters = {
    roleData(state){
        return state.roleData;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
};