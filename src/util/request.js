// 引入axios
import axios from "axios"
// post请求需要用到qs模块
import qs from "qs"

import {warningAlert} from "./alert"

// 设置响应拦截器
axios.interceptors.response.use((res)=>{
    console.log("===拦截开始===");
    console.log(res);
    // 判断错误的时候
    if(res.data.code !== 200){
        warningAlert(res.data.msg)
    }
    return res;
})

// 抛出方法,引入方法的时候需要解构赋值

import Vue from "vue"

let baseUrl = "/api"
Vue.prototype.$imgPre = "http://localhost:3000"

// 菜单管理>>>>菜单添加
export const reqMenuAddList = (data)=>{
    // axios请求数据
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(data)
    })
}

// 菜单管理>>>>菜单列表
export const reqMenuList=(params)=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:'get',
        params:params
    })
}

// 菜单管理>>>>删除数据
export const reqMenuDel=(data)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify(data)
    })
}

// 菜单管理>>>>获取一条数据，用来实现点击编辑时弹框中有数据
export const reqMenuEdit = (params)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:params
    })
}

// 菜单管理>>>>修改数据
export const reqMenuUpdate = (data)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(data)
    })
}

// 角色管理>>>>角色列表
export const reqRoleList = ()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
    })
}

// 角色管理>>>>角色添加
export const reqRoleAdd = (data)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(data)
    })
}

// 角色管理>>>>角色删除
export const reqRoleDel = (data)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify(data)
    })
}

// 角色管理>>>>获取一条数据
export const reqRoleOne = (id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params:id
    })
}

// 角色管理>>>>角色修改
export const reqRoleUpdate = (form)=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(form)
    })
}


// 管理员管理>>>>.管理员列表（分页）
export const reqMangerList = (params)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params:params
    })
}

// 管理员总数（用于计算分页）
export const reqManageCount = ()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}

// 管理员管理>>>>管理员添加
export const reqMangerAdd = (data)=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(data)
    })
}

// 管理员管理>>>>管理员删除
export const reqMangerDel = (uid)=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify(uid)
    })
}

// 管理员管理>>>>管理员修改
export const reqMangerUpdate = (form)=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(form)
    })
}

// 管理员管理>>>>管理员获取（一条）
export const reqMangerOne = (uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:uid
    })
}

// 商品分类>>>>商品分类列表
export const reqCateList = (params)=>{
    return axios({
        url:baseUrl+"/api/catelist",
        method:"get",
        params:params
    })
}

// 商品分类>>>>商品分类添加
export const reqCateAdd = (data)=>{
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:data
    })
}

// 商品分类>>>>商品分类删除
export const reqCateDel = (id)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:id
    })
}

// 商品分类>>>>商品分类获取（一条）
export const reqCateOne = (id)=>{
    return axios({
        url:baseUrl+"/api/cateinfo",
        method:"get",
        params:id
    })
}

// 商品分类>>>>商品分类修改
export const reqCateUpdate = (data)=>{
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:data
    })
}

// 规格管理>>>>商品规格列表（分页）
export const reqSpcesList = (params)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:params
    })
}

// 规格管理>>>>商品规格添加
export const reqSpcesAdd = (data)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:data
    })
}

// 规格管理>>>>商品规格删除
export const reqSpcesDel = (id)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:id
    })
}

// 规格管理>>>>商品规格获取（一条）
export const reqSpcesOne = (id)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:id
    })
}

// 规格管理>>>>商品规格修改
export const reqSpcesUpdate = (data)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:data
    })
}

// 规格管理>>>>商品规格总数（用于计算分页）
export const reqSpcesCount = ()=>{
    return axios({
        url:baseUrl+"/api/specscount",
        method:"get"
    })
}

// ------------------商品管理------------------------------

// 商品添加
export const reqGoodsAdd = (data)=>{
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:data
    })
}

// 商品总数（用于计算分页）
export const reqGoodsCount = ()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}

// 商品列表（分页）
export const reqGoodsList = (params)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:params
    })
}

// 商品获取（一条）
export const reqGoodsOne = (id)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:id
    })
}

// 商品修改
export const reqGoodsUpdate = (data)=>{
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:data
    })
}

// 商品删除
export const reqGoodsDel = (id)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:id
    })
}
