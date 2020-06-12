<template>
  <div id="Class">
    <div>
      <!-- 商品分类  -->
      <div>
        <span>商品分类</span>
        <el-button type="primary" @click="addClass">添加分类</el-button>
      </div>

      <!-- 表格 -->
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="180"></el-table-column>
          <el-table-column label="分类名称" width="180">
            <template slot-scope="scope">
              <el-input
                size="mini"
                placeholder="请输入内容"
                v-model="change_input"
                v-if="scope.row.flag"
              ></el-input>

              <span v-else>{{scope.row.cateName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                :active-value="true"
                :inactive-value="false"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="!scope.row.flag"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="edit(scope.$index,scope.row)" v-if="scope.row.flag">保存</el-button>
              <el-button size="mini" @click="edit(scope.$index,scope.row)" v-else>编辑</el-button>

              <el-button size="mini" type="danger" @click="delBtn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页     -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 模态框 -->
    <div id="modal" v-show="hide">
      <div>
        <div>
          <span>添加分类</span>
          <span @click="hide=false">×</span>
        </div>

        <div>
          <span>分类名称</span>
          <el-input v-model="add_input" placeholder="请输入内容"></el-input>
        </div>

        <div>
          <span>是否启用</span>
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="addChange(value)"
          ></el-switch>
        </div>

        <div>
          <el-button @click="hide=false">取消</el-button>
          <el-button type="primary" @click="addBtn">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入获取分类
import { CLASS } from "@/api/apis";
//添加分类
import { ADDCLASS } from "@/api/apis";
//删除分类
import { DELCLASS } from "@/api/apis";
//修改分类
import { EDITCLASS } from "@/api/apis";

export default {
  data() {
    return {
      tableData: [],
      value: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      add_input: "",
      //模态框的显示隐藏
      hide: false,
      change_input: ""
    };
  },

  methods: {
    // 封装渲染商品分类列表
    goodslist(currentPage) {
      CLASS(currentPage, this.pageSize).then(res => {
        this.total = res.data.total;
        // 添加自定义属性
        for (let i of res.data.data) {
          i.flag = false;
        }
        for (let i of res.data.data) {
          // 切换按钮
          if (i.state == 1) {
            i.state = true;
          } else {
            i.state = false;
          }
        }

        this.tableData = res.data.data;
      });
    },

    //点击添加设置模态框的隐现
    addClass() {
      this.hide = !this.hide;
    },

    //是否选择
    //     handleChange(aa, bb) {
    //       this.tableData[aa].state = bb.isuse;
    // console.log(aa,bb);

    //     },

    // 每页显示多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.goodslist(this.currentPage);
    },

    // 点击下一页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.goodslist(val);
    },
    // 添加分类

    addChange(val) {
      this.value = val;
    },
    addBtn() {
      if (this.add_input == "") {
        this.$message("请输入分组名称");
      }
      //  如果是布尔值的 false 要将转换成字符串false 才能传参
      if (this.value == false) {
        this.value = this.value.toString();
      }
      ADDCLASS(this.add_input, this.value).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.hide = !this.hide;
        }
      });
      // 从新渲染
      this.goodslist(this.currentPage);
    },

    //  删除分类
    delBtn(row) {
      // console.log();
      if (!confirm("请确认删除")) return;
      DELCLASS(row.id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "删除成功",
            type: "success"
          });

          // 从新渲染
          this.goodslist(this.currentPage);
        }
      });
    },

    // 编辑
    edit(index, row) {
      row.flag = !row.flag;

      if (row.flag == true) {
        // 点击编辑互不影响
        for (let i of this.tableData) {
          i.flag = false;
        }
        row.flag = true;
        this.change_input = row.cateName;
      } else if (row.flag == false) {
        EDITCLASS(row.id, this.change_input, row.state.toString()).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.goodslist(this.currentPage);
          }
        });
      }
    }
  },
  created() {
    // 渲染商品分类页面
    this.goodslist(this.currentPage);
  }
};
</script>












<style lang="less" scoped>
#Class {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  padding: 30px;
  box-sizing: border-box;
  #modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(5, 5, 5, 0.6);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;

    & > div {
      // flex-direction: column;
      width: 400px;
      height: 250px;
      background-color: white;
      padding: 20px;
      box-sizing: border-box;
      & > div:nth-child(1) {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        span:nth-child(2) {
          cursor: pointer;
        }
      }
      & > div:nth-child(2) {
        display: flex;
        margin-bottom: 20px;
        span {
          width: 100px;
          line-height: 40px;
        }
      }

      & > div:nth-child(3) {
        span {
          margin-right: 10px;
        }
      }

      & > div:nth-child(4) {
        display: flex;

        justify-content: flex-end;
        margin-top: 40px;
      }
    }
  }
  & > div:nth-child(1) {
    width: 1200px;
    background: white;
    padding: 20px;
    & > div:nth-child(1) {
      line-height: 40px;
      border-bottom: 1px solid #f0f2f5;
      display: flex;
      justify-content: space-between;
    }
    & > div:last-child {
      margin-top: 20px;
    }
  }
}
</style>