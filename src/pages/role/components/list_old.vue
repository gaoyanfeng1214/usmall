<template>
<div>
    <el-table
    :data="roleListData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <!-- 角色编号 -->
    <!-- prop属性对应列内容的字段名，所以使用这个属性来渲染页面 -->
    <el-table-column
      prop="id"
      label="角色编号"
      width="100">
    </el-table-column>
    <!-- 角色名称 -->
    <el-table-column
      prop="rolename"
      label="角色名称"
      width="180">
    </el-table-column>
    <!-- 状态 -->
    <el-table-column
      prop="status"
      label="状态">
      <el-row slot-scope="scope">
        <!-- 判断每一行的status 是1就是启用 是2就是禁用 -->
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
    </el-row>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
      prop=""
      label="操作" width="200">
      <!-- scope.row是获取table中一行的值 -->
      <!-- slot-scope="scope" 在此标签里就可以用scope -->
      <el-row slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="delMenu(scope.row.id)">删除</el-button>
    </el-row>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
import {reqRoleDel} from "../../../util/request"
export default {
computed:{
  ...mapGetters({
    roleListData:"role/roleData"
  }),
  ...mapGetters({
        menuList:"menu/menuList"
  })
},
components:{
 },
data () {
 return {
 }
},
methods:{
  ...mapActions({
        requestMenuList:"menu/requestMenuList"
    }),
  ...mapActions({
    requestRoleAdd:"role/requestRoleAdd"
  }),
  // 点击删除
  delMenu(id){
    this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        reqRoleDel({id:id}).then((res)=>{
          if(res.data.code==200){
              this.$message({
              type: "success",
              message: "删除成功!",
            });
             this.requestRoleAdd();
            }
        })
      }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
  }
},
mounted(){
  // 方法必须调用
  this.requestRoleAdd()
}
}
</script>
<style scoped>
</style>