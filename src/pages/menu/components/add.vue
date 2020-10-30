<template>
<div>
<el-dialog :title="info.title" :visible.sync="info.isShow">
    <!-- 菜单名称 -->
  <el-form :model="form">
    <el-form-item label="菜单名称" :label-width="width">
        <!-- 每一项的v-model对应form对象的一个键值 -->
      <el-input v-model="form.title" autocomplete="off"></el-input>
    </el-form-item>
    <!-- 上级菜单 -->
    <el-form-item label="上级菜单" :label-width="width">
      <el-select v-model="form.pid" @change="changePid">
        <el-option label="--请选择--" value disabled></el-option>
        <el-option label="顶级菜单" :value="0"></el-option>
        <!-- 循环请求回来的数据，渲染 -->
        <el-option v-for="item in list" :key='item.id' :label="item.title" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <!-- 菜单类型 -->
    <el-form-item label="菜单类型" :label-width="width">
        <!-- 点击目录显示菜单图标，点击菜单显示菜单地址 -->
        <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
        <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
    </el-form-item>
    
    <!-- 菜单图标 -->
    <el-form-item label="菜单图标" :label-width="width" v-if="form.type==1">
      <el-select v-model="form.icon">
        <el-option label="--请选择--" value disabled></el-option>
        <el-option v-for="item in icons" :key="item">
            <i :class="item"></i>
        </el-option>
      </el-select>
    </el-form-item>

    <!-- 菜单地址 -->
    <el-form-item label="菜单地址" :label-width="width" v-else>
      <el-select v-model="form.url" placeholder="请选择">
        <el-option v-for="item in indexRouters" :key='item.path' :label="item.name" :value="'/'+item.path"></el-option>
        
      </el-select>
    </el-form-item>

    <!-- 状态 -->
    <el-form-item label="状态" :label-width="width">
      <el-switch v-model="form.status" :active-value="1"  :inactive-value="2"></el-switch>
    </el-form-item>
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <!-- 当isAdd为true的时候 显示添加按钮 否则显示修改按钮 -->
    <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
    <el-button type="primary" @click="update" v-else>修改</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
// 引入axios
import {reqMenuAddList} from "../../../util/request"
import {reqMenuEdit} from "../../../util/request"
import {reqMenuUpdate} from "../../../util/request"
// 引入alert弹框
import {successAlert,warningAlert} from "../../../util/alert"
// 引入vuex辅助函数
import {mapGetters,mapActions} from "vuex"
// 引入路由规则下的二级路由
import {indexRouters} from '../../../router/index'
export default {
// 通过props接受父组件的数据
props:["info"],
computed:{
  ...mapGetters({
    list:"menu/menuList"
  })
},
components:{
 },
data () {
 return {
   indexRouters:indexRouters,
     width:"120px",
     form:{
         pid:"",
         title:'',
         icon:'',
         type:0,
         url:'',
         status:1
     },
    //  图标集合
     icons: [
        "el-icon-s-tools",
        "el-icon-message-solid",
        "el-icon-s-check",
        "el-icon-s-data"
      ],
 }
},
methods:{
  // 点击添加的时候清空列表
  empty(){
    this.form = {
        pid:"",
         title:'',
         icon:'',
         type:0,
         url:'',
         status:1
    }
  },

  changePid(){
      if(this.form.pid===0){
        this.form.type = 1;
      }else{
        this.form.type = 2;
      }
    },
    // 子传父，通过$emit()方法，自定义close事件
    cancle(){
        this.$emit("close");
    },
    add(){
      reqMenuAddList(this.form).then((res)=>{
        if(res.data.code === 200){
          successAlert(res.data.msg);
          // 当添加成功的时候，报成功信息，并且让弹框隐藏
          this.cancle();
          // 点击添加刷新列表
          this.requestMenuList();
        }else{
          warningAlert(res.data.msg);
        }
      })
    },
    look(id){
      // 发送axios请求
      reqMenuEdit({id:id}).then((res)=>{
        this.form = res.data.list
        this.form.id = id;
      })

    },
    // 回去调用menu.js中的requestMenuList方法，发送请求，并把数据给到mapGetters中的list
    ...mapActions({
      requestMenuList:'menu/requestMenuList'
    }),
    update(){
      reqMenuUpdate(this.form).then((res)=>{
        if(res.data.code === 200){
          successAlert(res.data.msg);
          this.requestMenuList();
          this.cancle();
        }else{
          warningAlert(res.data.msg);
        };
      })
    }
},
mounted(){

}
}
</script>
<style scoped>
</style>