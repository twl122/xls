<template>
  <div id="admin">
    <div>
      <div>管理员信息</div>
      <div>
        管理员ID：
        <span>{{id}}</span>
      </div>
      <div>
        账号：
        <span>{{acc}}</span>
      </div>
      <div>
        用户组：
        <span>{{group}}</span>
      </div>
      <div>
        创建时间：
        <span>{{ctime}}</span>
      </div>
      <div>
        管理员头像：
        <img :src="img" alt width="80px" />
      </div>
        <!-- 头像上传 -->
      <div>
        更换头像：
        <div>
        <el-upload
  class="avatar-uploader"
  action="http://127.0.0.1:5000/users/avatar_upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :data='data'
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload></div>
      </div>
    </div>
  </div>
</template>

<script>
//引入接口
import { ADMIN } from "@/api/apis";

export default {
  data() {
    return {
      id: "",
      acc: "",
      group: "",
      ctime: "",
      img: "",
     data:{id:localStorage.id},
      imageUrl: ''
    };
  },
  created() {
   let id = JSON.parse(localStorage.id);
    
    ADMIN(id).then(res => {
      this.id = res.data.accountInfo.id;
      this.acc = res.data.accountInfo.account;
      this.group = res.data.accountInfo.userGroup;
      this.ctime = res.data.accountInfo.ctime.substring(0,19).replace(/T/," ") ;
      this.img = res.data.accountInfo.imgUrl;
   
    
      
    });
  },

  methods: {
  handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        window.location.reload()
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    


  }
};
</script>

<style lang="less" scoped>
#admin {
  height: 100%;
  width: 100%;
  background: #f0f2f5;
  padding: 20px;
  box-sizing: border-box;
  & > div {
    width: 1200px;
    background: white;
    padding: 20px;
    div {
      line-height: 50px;
      border-bottom: 1px solid #f0f2f5;
    }
  }
};

// 上传头像的样式 
 .avatar-uploader .el-upload {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
     border: 1px solid #d9d9d9;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>