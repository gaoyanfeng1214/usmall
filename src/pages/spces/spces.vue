<template>
<div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list :roleList="roleList" @edit="edit($event)"></v-list>
</div>
</template>
<script>
import vAdd from "./components/add"
import vList from "./components/list"
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
         title:"添加商品规格"
     }
 }
},
methods:{ 
    // 点击添加
    willAdd(){
        this.info.isShow = true;
        this.info.title = "添加商品规格";
        this.$refs.add.empty();
    },
    edit(id){
        this.info.isShow = true;
        this.info.title = "编辑商品规格";
        this.$refs.add.getOne(id);
    }
},
mounted(){
    
}
}
</script>
<style scoped>
    .el-button{
        margin:20px 0;
    }
</style>