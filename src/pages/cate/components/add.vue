<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <!-- 上级分类 -->
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 循环请求回来的数据，渲染 -->
            <el-option v-for="item in cateList" :key='item.id' :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 分类名称 -->
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" :label-width="width" v-if="form.pid!==0">

          <!-- 原生js -->
          <div class="my-upload">
            <h3>+</h3>
            <input type="file" @change="changeFile">
            <img :src="imageUrl" v-if="imageUrl">
          </div>

          <!-- <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
          >
            <img :src="imageUrl" class="avatar" />
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 添加取消按钮 -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <!-- 当点击添加按钮时，就显示添加按钮 当点击编辑按钮时，显示修改按钮 -->
        <el-button
          type="primary"
          v-if="info.title === '分类添加'"
          @click="add"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {successAlert,warningAlert} from "../../../util/alert"
import {reqCateAdd,reqCateOne,reqCateUpdate} from "../../../util/request"
import {mapGetters,mapActions} from "vuex"
export default {
    computed:{
        ...mapGetters({
            cateList:"cate/cateList"
        })
    },
  props: ["info"],
  components: {},
  data() {
    return {
      width: "120px",
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      imageUrl:""
    };
  },
  methods: {
      ...mapActions({
          requestCateList:"cate/requestCateList"
      }),
    getRoleList() {
      reqRoleList().then((res) => {
        this.roleList = res.data.list;
      });
    },
    // 点击取消
    cancel() {
      this.info.isShow = false;
    },
    // 清空弹框
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl=""
    },
    // 点击添加
    add() {
      console.log(this.form);
      let data = new FormData();
      for(let i in this.form){
        data.append(i,this.form[i])
      }
      console.log(data);
      reqCateAdd(data).then((res) => {
        if(res.data.code === 200){
          // 弹框消失
          this.cancel();
          // 清空弹框
          this.empty();
          // 显示弹框消息
          successAlert(res.data.msg);
          // 刷新列表
          this.requestCateList();
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      reqCateOne({ id: id }).then((res) => {
        this.form = res.data.list;
        // 给imageUrl赋值
        this.imageUrl = this.$imgPre+this.form.img;
        // 补id
        this.form.id = id;
      });
    },
    // 点击修改
    update() {
      // 有文件上传的时候，使用FormData
      let data = new FormData();
      for(let i in this.form){
        data.append(i,this.form[i]);
      }
      reqCateUpdate(data).then((res) => {
        if (res.data.code === 200) {
          // 弹框消失
          this.cancel();
          // 清空弹框
          this.empty();
          // 显示弹框消息
          successAlert(res.data.msg);
          // 刷新列表
          this.requestCateList();
        }
      });
    },
    // 点击+号
    changeFile(e){
      // console.log(e);
      let file = e.target.files[0];
      // console.log(file);
      if(file.size > 2*1024*1024){
        warningAlert("文件大小不能超过2M");
        return;
      }

      // 图片的后缀名
      let imgArr=[".jpg",".jpeg",".png",".gif"];
      let name = file.name;
      let extname = name.slice(name.lastIndexOf("."));
      if(!imgArr.includes(extname)){
        warningAlert("请上传正确的图片格式");
        return;
      }
      // URL.createObjectURL可以把文件生成地址
      this.imageUrl = URL.createObjectURL(file);
      this.form.img=file;
    }
  },
  mounted() {
      this.requestCateList();
  },
};
</script>
<style scoped>
  .my-upload{
    width: 100px;
    height: 100px;
    border:1px solid #ccc;
    position: relative;
    cursor:pointer;
  }
  .my-upload input{
    width: 100px;
    height: 100px;
    position: absolute;
    left:0;
    top:0;
    opacity: 0;
    z-index:2;
  }
  .my-upload h3{
    width: 100px;
    line-height: 100px;
    text-align: center;
  }
  .my-upload img{
    width: 100px;
    height: 100px;
    position: absolute;
    top:0;
    left:0;
    z-index : 1;
  }
</style>