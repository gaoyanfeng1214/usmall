<template>
<div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list></v-list>
    <v-add :info="info" @close="cClose"></v-add>
</div>
</template>
<script>
import vList from "./components/list"
import vAdd from "./components/add"
export default {
components:{
    vList,
    vAdd
 },
data () {
 return {
     info:{
        isShow:false,
        title:""
     }
 }
},
methods:{
    // 点击添加按钮显示弹框
    willAdd(){
        this.info.isShow = true;
        this.info.title = "添加角色";
    },
    cClose(){
        this.info.isShow = false;
    }
},
mounted(){
}
}
</script>
<style scoped>
.el-button{
        margin-top:20px;
        margin-bottom:10px; 
    }
</style>