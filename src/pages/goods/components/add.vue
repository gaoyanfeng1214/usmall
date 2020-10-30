<template>
  <div class="box">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 循环请求回来的数据，渲染 -->
            <el-option v-for="item in cateList" :key='item.id' :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 循环请求回来的数据，渲染 -->
            <el-option v-for="item in secondCateList" :key='item.id' :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="图片" :label-width="width" v-if="form.pid!==0">
          <!-- 原生js -->
          <div class="my-upload">
            <h3>+</h3>
            <input type="file" @change="changeFile">
            <img :src="imageUrl" v-if="imageUrl">
          </div>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" @change="changeSpces">
            <!-- 循环请求回来的数据，渲染 -->
            <el-option v-for="item in spcesList" :key='item.id' :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="规格属性" :label-width="width">
          <el-select v-model="form.specsattr" multiple>
            <el-option v-for="item in secondSpcesList" :key='item' :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
          <template>
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </template>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="width">
          <template>
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </template>
        </el-form-item>
        
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
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
import {reqCateList} from "../../../util/request"
import {mapGetters,mapActions} from "vuex"
export default {
    computed:{
        ...mapGetters({
            cateList:"cate/cateList",
            spcesList:"spces/spcesList"
        })
    },
  props: ["info"],
  components: {},
  data() {
    return {
      width: "120px",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      },
      // 二级分类的list
      secondCateList:[],
      // 规格属性的list
      secondSpcesList:[],
      // 图片的地址
      imageUrl:""
    };
  },
  methods: {
      ...mapActions({
          requestCateList:"cate/requestCateList",
          requestSpcesList:"spces/requestSpcesList"
      }),

      // 当一级分类发生变化时，根据一级分类的pid查找二级分类
      changeFirst(){
        // 每次一改变，就得把二级分类清空一下
        this.form.second_cateid="";
        reqCateList({pid:this.form.first_cateid}).then((res)=>{
          this.secondCateList = res.data.list;
        });
      },

      // 当规格发生变化，属性发生相应的变化
      // 在请求回来的spcesList中通过specsid查找对应的数据
      changeSpces(){
        // 每次一改变，就得把规格属性清空一下
        this.form.specsattr=[];
        let obj = this.spcesList.find((item)=>{
          return item.id === this.form.specsid
        });
        // 只要obj里的attrs
        this.secondSpcesList = obj.attrs;
      },





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
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price:"",
        img:null,
        description:"",
        specsid:"",
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      };
      this.secondCateList=[];
      this.secondSpcesList=[];
      this.imageUrl=""
    },
    // 点击添加
    add() {
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
      // 一进来就获取分类列表和规格列表
      this.requestCateList();
      this.requestSpcesList();

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