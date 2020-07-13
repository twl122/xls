<template>
  <div id="al">
    <div>
      <span>账号列表1111111</span>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @select="selectCall"
        @select-all="selectAll"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column label="账号" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>-->
        <el-table-column prop="account" label="账号" width="120"></el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <div style="margin-top: 20px">
        <el-button type="danger" @click="batchdel">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>

    <!-- 模态框 -->
    <div id="modal" v-show="show">
      <div>
        <div>
          <span>账号:</span>
          <input type="text" v-model="acc" />
        </div>
        <div>
          <span>用户组:</span>
          <input type="text" v-model="group" />
        </div>
        <div>
          <el-button type="primary" @click="confirm">确认</el-button>

          <el-button type="info" @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 账号列表接口
import { ACCOUNT_LIST } from "@/api/apis";
//删除接口
import { DEL } from "@/api/apis";
//批量删除接口
import { DELALL } from "@/api/apis";
//修改账号接口
import { REVISE } from "@/api/apis";

export default {
  data() {
    return {
      tableData: [],
      //
      multipleSelection: [],
      currentPage: 1,
      pagesize: 5,

      total: 0,
      row: "",
      show: false,
      acc: "",
      group: "",
      id: ""
    };
  },

  created() {
    this.acclist(this.currentPage);
  },

  methods: {
    // 封装渲染账户列表
    acclist(currentPage) {
      ACCOUNT_LIST(currentPage, this.pagesize).then(res => {
        // console.log(res.data.data[2].id);

        //总条数
        this.total = res.data.total;
        //获取数组
        //  console.log(res.data.data[1].ctime);
        let arr = [];
        for (let i of res.data.data) {
          //  console.log(i.ctime.substring(0,19).replace(/T/," "));
          arr.push(i.ctime.substring(0, 19).replace(/T/, " "));
        }
        // 转换数据库接收到的日期时间

        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].ctime = arr[i];
        }

        //赋值
        this.tableData = res.data.data;
      });
    },

    // 批量删除
    toggleSelection(rows) {
      // console.log(rows);
      this.row = "";

      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
          console.log(row.id);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
       
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.acclist(this.currentPage);
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      this.acclist(val);
    },

    // 删除
    del(index, id) {
      
      if ((id.account=='admin'||id.account=='guest')&&confirm("确认删除")) {
        this.$message("无法删除");
        return
      }
        DEL(id.id).then(res => {
          //  console.log(res.data.code);
          if (res.data.code == 0) {
            this.$message("删除成功");
          }
        });
      

      // 重新渲染
    this.acclist(this.currentPage)
    },
    //     // 单选
    selectCall(row) {
      this.row = row;
    },
    //全选
    selectAll(row) {
      this.row = row;
    },

    //批量删除
    batchdel() {
      let arr = [];
      for (let i of this.row) {
        arr.push(i.id);
      }
      arr = JSON.stringify(arr);

      if (JSON.parse(arr).length == 0) return;
      if (confirm("确认删除")) {
        DELALL(arr).then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: "批量删除成功",
              type: "success"
            });
           
          }
        });
      }
      // 重新渲染
      this.acclist(this.currentPage)
      // 当一页只有一个数据时删除自动前往上一页
  ACCOUNT_LIST(this.currentPage, this.pagesize).then(res => {
  //赋值
        if(res.data.data.length==0){
          this.acclist(this.currentPage-1)
        }
     
      });


      



    },

    //编辑 弹出模态框
    edit(aa, bb) {
      this.show = true;
      this.acc = bb.account;
      this.group = bb.userGroup;
      this.id = bb.id;
    },

    // 模态框取消
    cancel() {
      this.show = !this.show;
    },

    //保存更改数据
    confirm() {
      // 延时隐藏模态框
      setTimeout(() => {
        this.show = !this.show;
      }, 2000);

      // 发请求
      REVISE(this.id, this.acc, this.group).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，更改成功",
            type: "success"
          });
          // 重新渲染
this.acclist(this.currentPage)
        }
      });
    }
  }
};
</script>












<style lang="less" scoped>
#al {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  padding-top: 30px;
  box-sizing: border-box;

  #modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: -50px;
    z-index: 10;
    background-color: rgba(5, 5, 5, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      & > div:nth-child(1) {
        line-height: 50px;
        input {
          height: 30px;
          border-radius: 5px;
          border: 1px solid gray;
          text-indent: 20px;
        }
        span {
          margin-right: 20px;
        }
      }
      & > div:nth-child(2) {
        line-height: 50px;
        input {
          height: 30px;
          border-radius: 5px;
          border: 1px solid gray;
          text-indent: 20px;
        }
        span {
          margin-right: 5px;
        }
      }
      & > div:nth-child(3) {
        text-align: center;
        margin-top: 30px;
      }
      background: white;
      width: 300px;
      height: 250px;
      border-radius: 5px;
      padding: 20px;
      box-sizing: border-box;
    }
  }
  & > div {
    width: 1200px;
    background: white;

    margin-left: 50px;
    padding: 20px;
  }
}
</style>