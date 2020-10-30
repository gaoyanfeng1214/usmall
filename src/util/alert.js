import Vue from "vue"
let vm = new Vue()

// 成功的弹框
export const successAlert = (msg)=>{
    vm.$message({
        // message: '恭喜你，这是一条成功消息',
        message: msg,
        type: 'success'
      });
};

// 警告的弹框
export const warningAlert = (msg)=>{
    vm.$message({
        // message: '警告哦，这是一条警告消息',
        message: msg,
        type: 'warning'
      });
};