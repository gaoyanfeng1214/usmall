<template>
<div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-add :info="info" @init="getInit" ref="add"></v-add>
    <v-list :roleList="roleList" @init="getInit" @edit="edit($event)"></v-list>
    <!-- 页码 -->
  <el-pagination
    layout="prev, pager, next"
    @current-change="changePage"
    :page-size="size"
    :total="total">
  </el-pagination>
</div>
</template>
<script>
import vAdd from "./components/add"
import vList from "./components/list"
import {reqMangerList,reqManageCount} from "../../util/request"
export default {
components:{
    vAdd,
    vList
 },
data () {
 return {
     roleList:[],
     info:{
         isShow:false,
         title:"添加管理员"
     },
     total:0,
     size:2,
     page:1
 }
},
methods:{
    // 一进来就加载列表
    getInit(){
        // 获取数据总条数
        reqManageCount().then((res)=>{
            this.total=res.data.list[0].total;
            // console.log(res);
        });
        this.getList();
    },
    getList(){
        // 获取列表
        reqMangerList({size:this.size,page:this.page}).then((res)=>{
            if(res.data.code === 200){
                // console.log(res);
                // res.data.list是当前一页的数据
                // 如果res.data.list是null 就赋值一个空数组 否则就赋值为 res.data.list
                let list = res.data.list?res.data.list:[];
                // 如果当前页是空并且当前页不是第一页
                if(list.length == 0&& this.page>1){
                    this.page--;
                    this.getList();
                    return
                }
                this.roleList = list;
            }
        });
    },
    // 当页码发生变化的时候
    changePage(page){
        // 这里的page指的是点击的页码
        this.page=page;
        // console.log(this.page);
        this.getList();
    },
        
    // 点击添加
    willAdd(){
        this.info.isShow = true;
        this.info.title = "添加管理员";
        this.$refs.add.empty();
        this.getList();
    },
    edit(uid){
        this.info.isShow = true;
        this.info.title = "编辑管理员";
        this.$refs.add.getOne(uid);
    }
},
mounted(){
    this.getInit();
}
}
</script>
<style scoped>
    .el-button{
        margin:20px 0;
    }
</style>