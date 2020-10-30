<template>
<div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 表格 -->
    <!-- 通过自定义事件 来实现子传父 -->
    <!-- $event是怎么获取到list中edit方法的scope.row.id？ -->
    <v-list @edit="cEdit($event)"></v-list>
    <!-- 弹框 -->
    <!-- 父子传值,子组件通过绑定属性的方式获取父组件中info的数据 -->
    <!-- 子传父，使用子组件自定义的事件close -->
    <v-add :info="info" @close="cClose" ref="add"></v-add>
</div>
</template>
<script>
// 引入子组件
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
        //  控制子组件弹框的显示和隐藏
         isShow:false,
        //  add 弹框的头部文字
         title:"菜单添加",
         // 点击编辑时显示添加按钮的标识
         isAdd:true
     }
 }
},
methods:{
    // 让子组件的弹框显示
    willAdd(){
        this.info = {
            isShow : true,
            title:"菜单添加",
            isAdd : true
        };
        this.$refs.add.empty();
    },
    // 通知父组件关闭子组件的弹框
    cClose(){
        this.info.isShow = false;
    },
    cEdit(id){
        this.info = {
            isShow:true,
            title:"菜单编辑",
            // 点击编辑时显示修改按钮的标识
            isAdd:false
        }
        // 点击编辑按钮触发add页面中的look方法
        // 这里的id指的是什么？
        this.$refs.add.look(id)
        // console.log(id)
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