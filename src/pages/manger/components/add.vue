<template>
<div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
        <!-- 所属角色 -->
      <el-form :model="form">
          <el-form-item label="所属角色" :label-width="width">
      <el-select v-model="form.roleid">
        <el-option label="--请选择--" value disabled></el-option>
        <!-- 循环请求回来的数据，渲染 -->
        <el-option v-for="item in roleList" :key='item.id' :label="item.rolename" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <!-- 添加取消按钮 -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 当点击添加按钮时，就显示添加按钮 当点击编辑按钮时，显示修改按钮 -->
        <el-button type="primary" v-if="info.title==='添加管理员'" @click="add">添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import {reqRoleList,reqMangerAdd,reqMangerOne,reqMangerUpdate} from "../../../util/request"
import {successAlert} from "../../../util/alert"
export default {
props:["info"],
components:{
 },
data () {
 return {
     width:"120px",
     form:{
         roleid:"",
         username:"",
         password:"",
         status:1
     },
     roleList:[]
 }
},
methods:{
    getRoleList(){
        reqRoleList().then((res)=>{
            this.roleList = res.data.list;
        })
    },
    // 点击取消
    cancel(){
        this.info.isShow = false;
    },
    // 清空弹框
    empty(){
        this.form = {
            roleid:"",
            username:"",
            password:"",
            status:1
        }
    },
    // 点击添加
    add(){
        reqMangerAdd(this.form).then((res)=>{
            this.$emit("init");
            // 弹框消失
            this.info.isShow = false;
            // 清空弹框
            this.empty();
        })
    },
    // 获取一条数据
    getOne(uid){
        reqMangerOne({uid:uid}).then((res)=>{
            this.form = res.data.list;
            this.form.password = "";
            this.form.id = uid;
        })
    },
    // 点击修改
    update(){
        reqMangerUpdate(this.form).then((res)=>{
            if(res.data.code === 200){
                this.$emit("init");
                this.info.isShow = false;
            }
        })
    }
},
mounted(){
    this.getRoleList();
}
}
</script>
<style scoped>
</style>