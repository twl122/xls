<template>
  <div id="an">
    <div>
      <div>添加账号</div>

      <div>
        <div>账号：</div>
        <el-input v-model="user_input" placeholder="请输入账号"></el-input>
      </div>
      <div>
        <div>密码：</div>
        <el-input placeholder="请输入密码" v-model="pwd_input" show-password></el-input>
      </div>
      <div>
        <div>用户组：</div>

        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

  <div>
      <el-button type="primary" @click="Add">添加</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    </div>

  
  </div>
</template>

<script>
import { ADD_NUMBER } from "@/api/apis";
export default {
  data() {
    return {
      user_input: "",
      pwd_input: "",
      options: [
        {
          value: "普通管理员",
          label: "普通管理员"
        },
        {
          value: "超级管理员",
          label: "超级管理员"
        },
      
      ],
      value: ""
    };
  },
  methods:{
    Add(){
   
          ADD_NUMBER(this.user_input, this.pwd_input,this.value).then(res=>{
         if(res.data.code==0){
             this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        });
         }
            else{
              this.$message.error('添加失败，请稍后再试');
            }
          })
   
    },
    // 重置
  reset(){
 
          this.user_input= "",
      this.pwd_input= "",
       this.value=""
  }

  },


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
        width: 70px;
      }
      width: 500px;
      display: flex;
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>