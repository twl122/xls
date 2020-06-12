<template>
  <div id="pa">
    <div>
      <div>商品添加</div>
      <!-- 商品名称 -->
      <div>
        <div>商品名称</div>
        <div>
          <el-input v-model="name_input" placeholder="商品名称"></el-input>
        </div>
      </div>

      <!-- 商品分类 -->
      <div>
        <div>商品分类</div>
        <div>
          <el-select v-model="cateName" placeholder="请选择商品分类">
            <el-option
              v-for="item in options"
              :key="item.cateName"
             :value="item.cateName"
             
            ></el-option>
          </el-select>
        </div>
      </div>
      <!--商品价格  -->

      <div>
        <div>商品价格</div>
        <div>
         <el-input-number v-model="num"  :min="1"  label="描述文字"></el-input-number>
        </div>
      </div>

<!-- 商品图片 -->
      <div>
          <div>商品图片</div>
          <div><el-upload
  class="avatar-uploader"
  action="http://127.0.0.1:5000/goods/goods_img_upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload></div>
      </div>

<!-- 商品描述 -->

<div>
    <div>商品描述</div>
    <div><el-input
  type="textarea"
  :rows="2"
 
  v-model="textarea">
</el-input></div>
</div>


  <el-button type="primary" @click="add_btn">添加商品</el-button>


    </div>
  </div>
</template>

<script> 
// 引入查询所有分类名称
import {QUERYCLASS} from "@/api/apis"
// 添加商品
import {ADDGOODS} from "@/api/apis"

export default {
  data() {
    return {
      name_input: "",
      options: [
   
      ],
      cateName: "",
      num: 1,
    //   上传图片
   
     imageUrl: '',
        // 商品描述
         textarea: '',
  
    };
  },
  methods: {
   //   上传图片
    handleAvatarSuccess(res, file) {
     this.imageUrl = URL.createObjectURL(file.raw);
      //   上传图片名字
   this.imageUrl=res.imgUrl
    
        
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
      },
      // 点击上传按钮添加分类
      add_btn(){
        // console.log(this.textarea);
       ADDGOODS(this.name_input,this.cateName,this.num,this.imageUrl,this.textarea).then(res=>{
         console.log(res);
        if(res.data.code==0){
          this.$message({
          message: '添加成功',
          type: 'success'
        });
this.name_input='',this.cateName='',this.num='',this.imageUrl='',this.textarea=''
        
        }
         
       })
        
      }
  },
created(){
  QUERYCLASS().then(res=>{

//  初始化渲染到商品分类
this.options.push(res.data.categories)    
this.options=this.options[0]
 
  
  
    
    
  })
}



};
</script>

<style lang="less" scoped>

#pa{
    width: 100%;
    height: 100%;
    background: #F0F2F5;
    padding: 20px;
    box-sizing: border-box;
    &>div{
        width:1200px;
        background: white;
 padding:0 30px 30px;
button{
    margin-top: 10px;
}
      &>div:nth-child(1){
          line-height: 60px;
          border-bottom: 1px solid #F0F2F5;
         
      };
      &>div{
           &>div:nth-child(1){
              margin-right: 20px
          };
            &>div:nth-child(2){
             width: 300px;
          };
          display: flex;
          margin-top: 20px;
      }
    }
}

// 上传图片样式
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
    border: 1px solid #000;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>