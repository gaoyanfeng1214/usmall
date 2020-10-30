<template>
<div>
    <!-- menuListData 为store中的数据 -->
    <el-table
    :data="menuListData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <!-- 菜单编号 -->
    <!-- prop属性对应列内容的字段名，所以使用这个属性来渲染页面 -->
    <el-table-column
      prop="pid"
      label="菜单编号"
      width="100">
    </el-table-column>
    <!-- 菜单名称 -->
    <el-table-column
      prop="title"
      label="菜单名称"
      width="180">
    </el-table-column>
    <!-- 菜单图标 -->
    <el-table-column
      prop="icon"
      label="菜单图标">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <!-- 菜单地址 -->
    <el-table-column
      prop="url"
      label="菜单地址">
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
      prop="address"
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
// 引入vuex的辅助函数
import {mapActions,mapGetters} from 'vuex'
// 引入axios
import {reqMenuDel} from "../../../util/request"
export default {
computed:{
  ...mapGetters({
    // 为什么这里不用写路径就能找到menu/menuList？
    // 这是vuex的语法规则
    // menuListData是渲染到页面的数据
    menuListData:"menu/menuList",
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
  

  delMenu(id){
    this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        reqMenuDel({id:id}).then((res)=>{
          if(res.data.code==200){
              this.$message({
              type: "success",
              message: "删除成功!",
            });
             this.requestMenuList();
            }
        })
      }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
  },
  // 子传父
  edit(id){
    this.$emit("edit",id)
    // console.log(id)
  }
},
mounted(){
  this.requestMenuList()
}
}
</script>
<style scoped>
</style>