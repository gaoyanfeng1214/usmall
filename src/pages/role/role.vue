<template>
<div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 父传子传的是绑定的info属性 -->
    <v-add :info="info" @init="getInit" ref="add"></v-add>
    <v-list :roleList="roleList" @init="getInit" @edit="edit($event)"></v-list>
</div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
import {reqRoleList} from "../../util/request"
export default {
components:{
    vList,
    vAdd
 },
data () {
 return {
     roleList:[],
     info:{
        //  控制弹框的显示隐藏
         isShow:false,
         title:"添加角色"
     }
 }
},
methods:{
    // 把数据给到list组件中，渲染页面
    getInit(){
        reqRoleList().then((res)=>{
            this.roleList = res.data.list
        })
    },
    // 点击添加
    willAdd(){
        this.info.isShow = true;
        this.info.title = "添加角色";
        this.$refs.add.empty();
        this.$refs.add.opened();
    },
    // 通知add组件调用获取一条数据的方法
    edit(id){
        // 显示弹框
        this.info.isShow = true;
        this.info.title = "编辑角色";
        this.$refs.add.getOne(id);
    }
},
mounted(){
    // 一点进去角色管理组件时，就加载数据到list组件
    this.getInit();
}
}
</script>
<style scoped>
    .el-button{
        margin-top:20px;
        margin-bottom:20px; 
    }
</style>