<template>
  <div id="pl">
    <div>
      <div>商品列表</div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品id">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="评级">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="销售量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="category"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>

          <el-table-column label="商品图片" prop="imgUrl">
            <template slot-scope="scope">
              <img :src="img+scope.row.imgUrl" alt width="50px" />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="edit_btn(scope.row)">编辑</el-button>

              <el-button type="danger" @click="del_btn(scope.row)" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 模态框 -->

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
          <div>
            商品名称
            <el-input v-model="name_input" placeholder="请输入商品名称"></el-input>
          </div>
          <div>
            商品分类 
            <div>
            <el-select v-model="cateName" placeholder="请选择商品分类">
              <el-option v-for="item in options" :key="item.cateName" :value="item.cateName"></el-option>
            </el-select>
            </div>
          </div>
          <div>
            商品价格
            <el-input v-model="pri_input" placeholder="请输入商品价格"></el-input>
          </div>
          <div>
            商品图片地址
            <el-input v-model="url_input" placeholder="请输入商品图片地址"></el-input>
          </div>
          <div>
            商品描述
            <el-input v-model="goods_input" placeholder="请输入商品描述"></el-input>
          </div>
        

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="modal_btn">确 定</el-button>
          </span>
        </el-dialog>

        <!----------------------------------------------------   -->
      </div>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
//引入渲染商品列表
import { GETGOODS } from "@/api/apis";
//删除商品
import { DELGOODS } from "@/api/apis";
//编辑商品
import { EDITGOODS } from "@/api/apis";
// 引入查询所有分类名称
import { QUERYCLASS } from "@/api/apis";

export default {
  data() {
    return {
      tableData: [],
      options: [],
      //拼接的图片前面路径
      img: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      currentPage: 1,
      currentPages: 1,
      pagesizes: 5,
      // currentPage3: 5,
      // currentPage4: 4,
      total: 0,
      // 模态框
      dialogVisible: false,
      //input框的值
      name_input: "",
      // 动态渲染的商品分类
      cateName: "",
      //////////
      pri_input: "",
      url_input: "",
      goods_input: "",
      id: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesizes = val;
      this.goodslist(this.currentPage); //点击每页多少条渲染
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPages=val
      this.goodslist(val); //点击分页渲染
    },

    // 封装发送渲染商品列表
    goodslist(currentPages) {
      GETGOODS(currentPages, this.pagesizes).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        // console.log(res.data);
      });
    },
    // 删除商品
    del_btn(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DELGOODS(row.id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.goodslist(this.currentPages);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 模态框
  //  点击编辑弹出模态框
    edit_btn(row) {
      this.dialogVisible = true;
      this.name_input = row.name;
      this.cateName = row.category;
      this.pri_input = row.price;
      this.url_input = row.imgUrl;
      this.goods_input = row.goodsDesc;
      this.id=row.id
    },
    // 点击确定发送ajax
    modal_btn() {
      EDITGOODS(
        this.name_input,
        this.cateName,
        this.pri_input,
        this.url_input,
        this.goods_input,
        this.id
      ).then(res => {
        if(res.data.code==0){
          this.dialogVisible = false
         
          this.goodslist(this.currentPages)
        }
      });
    }
  },
  created() {
    // 进入页面的渲染列表
    this.goodslist(this.currentPages);
    QUERYCLASS().then(res => {
      //  初始化渲染获取到商品分类
      this.options.push(res.data.categories);
      this.options = this.options[0];
    });
  }
};
</script>

<style lang="less" scoped>
#pl {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  padding-top: 30px;
  box-sizing: border-box;
  & > div {
    width: 1200px;
    background: white;
    padding: 30px;
    margin-left: 30px;
    & > div:nth-child(1) {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #f0f2f5;
    }
    & > div:nth-child(3) {
      margin-top: 20px;
    }
  }
}

// 组件样式
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>