<template>
  <div id="box">
    <div id="loginBox">
      <h2>系统登录</h2>
      <el-input v-model="user_input" placeholder="请输入内容" prefix-icon="el-icon-user-solid"></el-input>
      <el-input placeholder="请输入密码" v-model="pwd_input" show-password prefix-icon="el-icon-lock"></el-input>
      <el-button type="primary" class="del" @click="loginBtn">登录</el-button>
    </div>
  </div>
</template>

<script>
import { API_LOGIN } from "@/api/apis"; //引入封装后的登录发送axios.
export default {
  data() {
    return {
      user_input: "",
      pwd_input: "",
      isreq: false //    防抖节流
    };
  },
  methods: {
    //  登录按钮
    loginBtn() {
      //    防抖节流  标杆
      if (this.isreq) return;

      this.isreq = true;

      API_LOGIN(this.user_input, this.pwd_input).then(res => {
        if (res.data.code == 0) {
          //  把id存储到本地存储中
          localStorage.id = JSON.stringify(res.data.id);
          //把token存储到本地存储中
          localStorage.token = res.data.token;
          //把权限存储到本地存储中
           localStorage.role=res.data.role

          this.$message({
            message: "恭喜你，登录成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("/index/ch"); //跳转路径
          }, 1000);
        } else {
          this.$message.error("登录失败");
        }
      });
      //    防抖节流
      setTimeout(() => {
        this.isreq = false;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
#box {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
}

#loginBox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 500px;
  // border: 1px solid #000;
  line-height: 50px;
  h2 {
    text-align: center;
    color: white;
  }
  .del {
    width: 100%;
  }
}
</style> 


