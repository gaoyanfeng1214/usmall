<template>
<div>
    <el-table
    :data="spcesList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

    <el-table-column
      prop="id"
      label="规格编号"
      width="100">
    </el-table-column>
    
    <el-table-column
      prop="specsname"
      label="规格名称"
      width="180">
    </el-table-column>
    
    <el-table-column
      label="规格属性"
      width="180">
      <template slot-scope="scope">
        <el-tag v-for="item in scope.row.attrs" :key="item.id">
          {{item}}
        </el-tag>
      </template>
    </el-table-column>
    
    <el-table-column
      prop="status"
      label="状态">
      <el-row slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
    </el-row>
    </el-table-column>
    
    <el-table-column
      prop=""
      label="操作" width="200">
      <!-- scope.row是获取table中一行的值 -->
      <!-- slot-scope="scope" 在此标签里就可以用scope -->
      <el-row slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
    </el-row>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination
    layout="prev, pager, next"
    @current-change="changePage"
    :page-size="size"
    :total="total">
  </el-pagination>
</div>
</template>
<script>
import {reqSpcesDel,reqMangerUpdate} from "../../../util/request"
import {mapGetters,mapActions} from "vuex"
export default {
computed:{
  ...mapGetters({
    spcesList:"spces/spcesList",
    total:"spces/total",
    size:"spces/size"
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
      requestSpcesList:"spces/requestSpcesList",
      requestSpcesCount:"spces/requestSpcesCount",
      changePageAction:"spces/changePageAction"
    }),
    // 点击删除
    del(id){
    this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        reqSpcesDel({id:id}).then((res)=>{
          if(res.data.code==200){
              this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 刷新页面
            this.requestSpcesList();
            //删除完成以后重新请求总数
            this.requestSpcesCount();
            }
        })
      }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
  },
    // 点击编辑
    edit(id){
        this.$emit("edit",id);
    },
    //修改页码
    changePage(page){
      this.changePageAction(page);
    },
},
mounted(){
    this.requestSpcesList();
    this.requestSpcesCount();
}
}
</script>
<style scoped>
</style>