<template>
<div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="规格属性" :label-width="width" v-for="(item,index) in attrArr" :key="index">
          <div class="box">
            <el-input v-model="item.val" autocomplete="off"></el-input>
            <el-button type="primary" @click="attrAdd" v-if="index===0">新增规格属性</el-button>
            <el-button type="danger" @click="attrDel" v-else>删除</el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 当点击添加按钮时，就显示添加按钮 当点击编辑按钮时，显示修改按钮 -->
        <el-button type="primary" v-if="info.title==='添加商品规格'" @click="add">添加</el-button>
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import {reqSpcesAdd,reqSpcesOne,reqSpcesUpdate} from "../../../util/request"
import {successAlert} from "../../../util/alert"
import {mapGetters,mapActions} from "vuex"
export default {
props:["info"],
components:{
 },
computed:{
    ...mapGetters({
        spcesList:"spces/spcesList"
    })
},
data () {
 return {
     width:"120px",
     form:{
         specsname:"",
         attrs:"[]",
         status:1
     },
    //  定义规格属性值 
     attrArr:[{val:""}]
 }
},
methods:{
    ...mapActions({
        requestSpcesList:"spces/requestSpcesList",
        requestSpcesCount:"spces/requestSpcesCount"
    }),
    // 点击新增规格属性
    attrAdd(){
        this.attrArr.push({val:""})
    },
    // 点击新增规格属性下面的删除
    attrDel(){
        this.attrArr.pop({val:""})
    },
    // 点击取消
    cancel(){
        this.info.isShow = false;
    },
    // 清空弹框
    empty(){
        this.form = {
            specsname:"",
            attrs:"[]",
            status:1
        };
        this.attrArr=[{val:""}]
    },
    // 点击添加
    add(){
        // 渲染到页面的attrs需要是一个数组，不能是一个字符串，所以要转换一下
        this.form.attrs = JSON.stringify(this.attrArr.map((item)=>{
            return item.val
        }));
        reqSpcesAdd(this.form).then((res)=>{
            // 弹框消失
            this.cancel();
            // 清空弹框
            this.empty();
            // 成功弹框
            successAlert(res.data.msg);
            // 刷新列表
            this.requestSpcesList();
            // 请求总数
            this.requestSpcesCount();
        })
    },
    // 获取一条数据
    getOne(id){
        reqSpcesOne({id:id}).then((res)=>{
            this.form = res.data.list[0];
            this.attrArr = JSON.parse(this.form.attrs).map((item)=>{
                return {val:item}
            });
        })
    },
    // 点击修改
    update(){
        this.form.attrs = JSON.stringify(this.attrArr.map((item)=>{
            return item.val
        }));
        reqSpcesUpdate(this.form).then((res)=>{
            if(res.data.code === 200){
                // 弹框消失
                this.cancel();
                // 清空弹框
                this.empty();
                // 成功弹框
                successAlert(res.data.msg);
                // 刷新列表
                this.requestSpcesList();
                //请求总数
                this.reqTotalAction()
            }
        })
    }
},
mounted(){
    
}
}
</script>
<style scoped>
    .box{
        display:flex;
    }
    .box .el-input{
        flex:1;
    }
</style>