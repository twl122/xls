<template>
  <div id="shop">
    <div>
      <div>
        <div>店铺管理</div>
        <el-button type="primary" @click="keep">保存</el-button>
      </div>
      <div>
        <div>店铺名称</div>
        <el-input v-model="name_input" placeholder="请输入店铺名"></el-input>
      </div>

      <div>
        <div>店铺公告</div>
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"></el-input>
      </div>

      <div>
        <div>店铺头像</div>

        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="img+imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <div>
        <div>店铺图片</div>

        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSucces"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>

      <div>
        <div>配送费</div>
        <el-input v-model="deliveryPrice_input"></el-input>
      </div>

      <div>
        <div>配送时间</div>
        <el-input v-model="deliveryTime_input"></el-input>
      </div>

      <div>
        <div>配送描述</div>
        <el-input v-model="description_input"></el-input>
      </div>

      <div>
        <div>店铺评分</div>
        <el-input v-model="score_input"></el-input>
      </div>

      <div>
        <div>销量</div>
        <el-input v-model="sellCount_input"></el-input>
      </div>

      <div>
        <div>活动</div>
        <div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox  v-for="item in check"  :label="item" :key="item"></el-checkbox>
        
          </el-checkbox-group>
        </div>
      </div>

      <div class="block">
        <span class="demonstration">营业时间</span>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
        
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
// 引入商店信息渲染
import { shop_info } from "@/api/apis";
// 引入修改商店
import { EDITSHOP } from "@/api/apis";

export default {
  data() {
    return {
      name_input: "",
      textarea: "",
      //    上传图片
      imageUrl: "",
      //店铺图片
      dialogImageUrl: [],
      dialogVisible: false,
      deliveryPrice_input: "",
      deliveryTime_input: "",
      description_input: "",
      score_input: "",
      sellCount_input: "",
      checkList: [],
      check:["在线支付满28减5","VC无限橙果汁全场8折","单人精彩套餐","特价饮品8折抢购","单人特色套餐"],
      value2: "",
      img: "http://127.0.0.1:5000/upload/shop/",
      id: "",
      fileList: [
    
      ]
    };
  },

  methods: {
    //    上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = res.imgUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //店铺上传图片
    handleRemove(file, fileList) {
      console.log(fileList)
      let arr = this.dialogImageUrl.filter(i => {
        return !(this.img + i).includes(file.url);
      });

      this.dialogImageUrl = arr;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleAvatarSucces(res) {
      this.dialogImageUrl.push(res.imgUrl);
    },
    // 保存
    keep() {

      // 时间的转换
      let dateArr = [];
      for (let i of this.value2) {
        let d = new Date(i);
        let year = d.getFullYear();
        let mouth =
          d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;

        let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

        let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();

        let minute =
          d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

        let seconds =
          d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

        dateArr.push(
          year +
            "-" +
            mouth +
            "-" +
            date +
            " " +
            hours +
            ":" +
            minute +
            ":" +
            seconds
        );
      }
// 保存接口
      EDITSHOP(
        this.id,
        this.name_input,
        this.textarea,
        this.imageUrl,
        this.deliveryPrice_input,
        this.deliveryTime_input,
        this.description_input,
        this.score_input,
        this.sellCount_input,
        JSON.stringify(this.checkList),
        JSON.stringify(this.dialogImageUrl),
        JSON.stringify(dateArr)
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        }
      });
    }
  },
  created() {
    // 商店接口渲染页面
    shop_info().then(res => {
      this.name_input = res.data.data.name;

      (this.textarea = res.data.data.bulletin),
        (this.imageUrl = res.data.data.avatar),
        (this.dialogImageUrl = res.data.data.pics),
        (this.deliveryPrice_input = res.data.data.deliveryPrice),
        (this.deliveryTime_input = res.data.data.deliveryTime),
        (this.description_input = res.data.data.description),
        (this.score_input = res.data.data.score),
        (this.sellCount_input = res.data.data.sellCount),
        (this.checkList = res.data.data.supports),
        (this.value2 = res.data.data.date);
      this.id = res.data.data.id;

      console.log(res.data.data.pics);

      // 照片墙的数据要是对象类型
      let arr = [];
      for (let i of res.data.data.pics) {
        let obj = {
          url: this.img + i
        };
        arr.push(obj);
      }

      // console.log(arr)

      this.fileList = arr;
    });
  }
};
</script>

<style lang="less" scoped>
// 传图片样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 103px;
  height: 103px;
  line-height: 103px;
  text-align: center;
}
.avatar {
  width: 103px;
  height: 103px;
  display: block;
}

///////////////////////////////////////
#shop {
  width: 100%;
  height: 100%;
  background: #ebedf0;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: scroll;
  #img_box {
    display: flex;
  }
  & > div {
    width: 1200px;
    background: white;
    padding: 20px;
    & > div:nth-child(1) {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ebedf0;
      line-height: 40px;
    }
    & > div:nth-child(2) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(3) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(4) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(5) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(6) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(7) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(8) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(9) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(10) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(11) {
      display: flex;
      line-height: 40px;
      margin-top: 20px;
      & > div:nth-child(1) {
        width: 100px;
      }
      & > div:nth-child(2) {
        width: 400px;
      }
    }

    & > div:nth-child(12) {
      span {
        margin-right: 30px;
      }
    }
  }
}
</style>