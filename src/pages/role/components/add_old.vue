<template>
<div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
          <!-- 角色名称 -->
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
             ref="tree"
             :props="{children:'children',label:'title'}"
          >
          </el-tree>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <!-- 添加取消按钮 -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add">添加</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import {reqRoleAdd} from "../../../util/request"
import {mapGetters,mapActions} from 'vuex'
import {successAlert,warningAlert} from "../../../util/alert"
export default {
props:["info"],
computed:{
    ...mapGetters({
        menuList:"menu/menuList"
    })
},
components:{
 },
data () {
 return {
     width: "120px",
      form: {
        rolename: "",
        menus: "",
        status:1,
      }
 }
},
methods:{
    ...mapActions({
        requestMenuList:"menu/requestMenuList"
    }),
    cancle(){
        this.$emit("close");
    },
    add(){
        // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedNodes());
        // reqRoleAdd(this.form).then((res)=>{
        //     this.requestMenuList()
        // });
        reqRoleAdd(this.form).then((res)=>{
            if(res.data.code === 200){
                successAlert(res.data.msg);
                this.cancle();
            }else{
                warningAlert(res.data.msg)
            };
        })
    }
},
mounted(){
    // console.log(this.menuList);
    this.requestMenuList();
}
}
</script>
<style scoped>
</style>