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
        <el-button @click="cancel">取 消</el-button>
        <!-- 当点击添加按钮时，就显示添加按钮 当点击编辑按钮时，显示修改按钮 -->
        <el-button type="primary" @click="add" v-if="info.title=='添加角色'">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import {reqMenuList,reqRoleAdd,reqRoleOne,reqRoleUpdate} from "../../../util/request"
import {successAlert} from "../../../util/alert"
export default {
props:["info"],
components:{
 },
data () {
 return {
     width:"120px",
     form:{
         rolename:"",
         menus:"",
         status:1
     },
     menuList:[]
 }
},
methods:{
    // 获取菜单列表的数据
    requestMenuList(){
        reqMenuList({istree:true}).then((res)=>{
            this.menuList = res.data.list;
        })
    },
    // 点击添加
    add(){
        // console.log(this.$refs.tree.getCheckedNodes());
        // console.log(this.$refs.tree.getCheckedKeys());
        // this.form赋值的时候menus是字符串，所以要进行转换一下
        // 获取form中的menus
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
        reqRoleAdd(this.form).then((res)=>{
            // 通过自定义事件的方式调用父组件的方法
            this.$emit("init");
            // 让弹框隐藏
            this.cancel();
            // 显示添加成功消息
            if(res.data.code === 200){
                successAlert(res.data.msg);
            }
        });
    },
    // 点击取消
    cancel(){
        // 因为父组件传值的时候传的是json类型，所以这里可以直接修改
        this.info.isShow = false;
    },
    // 获取一条
    getOne(id){
        this.info.isShow = true;
        reqRoleOne({id:id}).then((res)=>{
            this.form = res.data.list;
            // 让树形结构显示出来
            this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
            // 因为form里没有id，所以补id
            this.form.id = id;
        })
    },
    // 点击修改
    update(){
        // console.log(this.form);
        // console.log(this.$refs.tree.getCheckedKeys());
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleUpdate(this.form).then((res)=>{
            this.info.isShow = false;
            this.$emit("init");
        })
    },
    // 清空弹框
    empty(){
        this.form = {
            rolename:"",
            menus:"",
            status:1
        }
    },
    // 清空树形结构
    emptyTree(){
        this.$refs.tree.setCheckedKeys([]);
    },
    // Dialog 打开动画结束时的回调
    // 即等到动画结束的时候再去清空树形结构，不然会报错
    opened(){
        if(this.info.title==="添加角色"){
            this.emptyTree();
        }
    }
},
mounted(){
    // 一进add组件就把菜单列表的数据渲染上去
    this.requestMenuList();
}
}
</script>
<style scoped>
</style>