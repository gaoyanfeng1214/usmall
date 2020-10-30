<template>
<div class="main">
    <div class="content">
        <h3>登录</h3>
        <input type="text" placeholder="请输入用户名">
        <input type="text" placeholder="请输入密码">
        <div>
        <input type="button" value="登录" class="btn" @click="login">
    </div>
    </div>
</div>
</template>
<script>
export default {
components:{
 },
data () {
 return {
 }
},
methods:{
    login(){
        this.$router.push("/index/home");
    }
},
mounted(){
}
}
</script>
<style scoped>
    .main{
        width:100vw;
        height: 100vh;
        background: linear-gradient(to right,#563443,#2f3d60);
    }
    .content{
        width: 400px;
        height: 240px;
        background-color: #fff;
        position: absolute;
        top:150px;
        right:0;
        left:0;
        margin:auto;
        border-radius:8px;
        text-align: center;
    }
    input{
        width: 200px;
        height: 30px;
        margin-top:20px;
        border-radius:4px;
        border:1px solid #ccc;
        padding-left:10px;
        box-sizing:border-box;
    }
    input::placeholder{
        color:#c0c4cc;
        font-size:12px;
    }
    h3{
        margin-top:20px;
        font-weight:bold;
    }
    .btn{
        background-color: #409eff;
        border:none;
        color:#fff;
        padding-left:0;
    }
</style>