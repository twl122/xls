<template>
  <div id="an">
    <div>
      <div>修改密码</div>

      <div>
        <div>密码：</div>
        <el-input v-model="user_input" placeholder="请密码" @blur="oldPwd"></el-input>
      </div>
      <div>
        <div>新密码：</div>
        <el-input placeholder="请输入密码" v-model="pwd_input" show-password></el-input>
      </div>
  
  <div>
        <div>确认密码：</div>
        <el-input placeholder="请输入新密码" v-model="new_input" show-password></el-input>
      </div>
  
  <div>
      <el-button type="primary" @click="edit_btn">确定</el-button>
      <el-button @click="user_input='',pwd_input='',new_input=''">重置</el-button>
    </div>

    </div>

  
  </div>
</template>

<script>
// 验证旧密码是否正确
import { OLDPWD } from '@/api/apis'
// 修改密码
import { EDITPWD } from '@/api/apis'
export default {
  data() {
    return {
      user_input: "",
      pwd_input: "",
      new_input:'',
      flag:false
    };
  },
  methods:{
    // 验证旧密码
    oldPwd(){

             let id=JSON.parse(localStorage.id);
      
              OLDPWD(this.user_input,id).then(res=>{
                // console.log(res.data.code);
                if(res.data.code!=0) {
                   this.$message.error('密码错误');
                  
                }
                  else{
                    this.flag=true
                  }     
             
                
              })
    },
    edit_btn(){
// console.log(this.flag)
   if(!this.flag) return
      if(this.pwd_input!==this.new_input){        this.$message({
          message: '密码不一致',
          type: 'warning'
        });return }
        let id=JSON.parse(sessionStorage.getItem('key'));
        // console.log(this.pwd_input,id);
        
      EDITPWD(this.pwd_input,id).then(res=>{
        // console.log(res);
        if(res.data.code==0){
                   this.$message({
          message: '修改成功，请重新登录',
          type: 'success'
        });
          setTimeout(()=>{
this.$router.push("/")
          },1500)
        }
        
      })
    }
  }
};
</script>

<style lang="less" scoped>
#an {
  height: 100%;
  background: #f0f2f5;
  padding: 20px;
  
box-sizing: border-box;

  & > div {
    width: 100%;
  
    background: white;
    height: 300px;
    padding-left: 20px;
    & > div:nth-child(1) {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #f0f2f5;
      text-indent: 20px;
      color: #3d3e40;
    }

    & > div:nth-child(2) {
      div:nth-child(1) {
        width: 80px;
      }
      width: 500px;
      display: flex;
      height: 60px;
      line-height: 60px;
    }

    & > div:nth-child(3) {
      div:nth-child(1) {
        width: 80px;
      }
      width: 500px;
      display: flex;
      height: 60px;
      line-height: 60px;
    }
    & > div:nth-child(4) {
      div:nth-child(1) {
        width: 112px;
      }
      width: 500px;
      display: flex;
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>