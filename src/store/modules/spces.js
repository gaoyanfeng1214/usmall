import {reqSpcesList,reqSpcesCount} from "../../util/request"

const state = {
    spcesList:[],
    // 数据总条数
    total:0,
    // 页码
    page:1,
    // 一页显示的个数
    size:2
}

const mutations = {
    // 修改列表
    changeSpcesList(state,arr){
        state.spcesList = arr;
    },
    // 修改总数
    changeTotal(state,num){
        state.total = num;
    },
    // 修改page
    changePage(state,page){
        state.page = page;
    }
}

const actions = {
    // 发起获取列表的请求
    requestSpcesList(context){
        reqSpcesList({ page: context.state.page, size: context.state.size }).then((res)=>{
            if(res.data.code === 200){
                // 保证list一定是一个数组
                let list = res.data.list?res.data.list:[];
                if(list.length===0&&context.state.page>1){
                    context.commit("changePage",context.state.page-1)
                    context.dispatch("requestSpcesList")
                    return;
                };
                // 由于list数组里的attrs是一个字符串数组，所以要转换一下
                list.forEach((item)=>{
                    item.attrs = JSON.parse(item.attrs);
                });
                context.commit("changeSpcesList",list);
            }
        })
    },
    // 发请求，获取总数
    requestSpcesCount(context){
        reqSpcesCount().then((res)=>{
            if(res.data.code === 200){
                context.commit("changeTotal",res.data.list[0].total);
            }
        })
    },
    //修改页码
    changePageAction(context,page){
        //修改page
        context.commit("changePage",page)
        //重新请求list
        context.dispatch("requestSpcesList")
    }


}

const getters = {
    spcesList(state){
        return state.spcesList
    },
    total(state){
        return state.total
    },
    size(state) {
        return state.size
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}