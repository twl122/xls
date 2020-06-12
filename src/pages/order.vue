<template>
  <div id="data_box">
    <div id="search">
      订单号：
      <el-input v-model="input1" placeholder="订单号" class="input"></el-input>收货人：
      <el-input v-model="input2" placeholder="收货人" class="input"></el-input>手机号：
      <el-input v-model="input3" placeholder="手机号" class="input"></el-input>订单状态：
      <el-select v-model="value3" placeholder="订单状态">
        <el-option v-for="item in options" :key="item.value" :value="item.value"></el-option>
      </el-select>

      <div class="block">
        <span class="demonstration">时间：</span>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
        <el-button type="primary" @click="query_btn">查询</el-button>
      </div>
    </div>
    <!-- <div>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>-->

    <div id="table_box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column prop="deliveryTime" label="下单时间" width="120"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="300"></el-table-column>
        <el-table-column prop="orderTime" label="送到时间" width="120"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
           
            <el-button type="text" size="small" @click="edit_btn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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

    <!-- 模态框 -->

    <el-dialog title="修改订单" :visible.sync="dialogVisible" width="30%">
      <div class="block">
        <span class="demonstration">订单号</span>
        <el-input v-model="orderNo_input"></el-input>
      </div>
      <div>
        下单时间
        <div class="block">
          <el-date-picker v-model="date1" type="datetime" placeholder="选择下单时间"></el-date-picker>
        </div>
      </div>
      <div>
        手机号
        <el-input v-model="phone_input"></el-input>
      </div>
      <div>
        收货人
        <el-input v-model="consignee_input"></el-input>
      </div>
      <div>
        配送地址
        <el-input v-model="deliverAddress_input"></el-input>
      </div>
      <div>
        送到时间
        <div class="block">
          <el-date-picker v-model="date2" type="datetime" placeholder="选择送到时间"></el-date-picker>
        </div>
      </div>
      <div>
        用户备注
        <el-input v-model="remarks_input"></el-input>
      </div>
      <div>
        订单金额
        <el-input v-model="orderAmount_input"></el-input>
      </div>
      <div>
        订单状态
        <div>
          <el-select v-model="cateName">
            <el-option v-for="item in option" :key="item.value" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modal_btn">确 定</el-button>
      </span>
    </el-dialog>

    <!----------------------------------------------------   -->
  </div>
</template>

<script>
// 引入获取订单列表
import { ORDERLIST } from "@/api/apis";
//查询对应的列表
import { QUERYLIST } from "@/api/apis";

//修改订单
import { EDITORDER } from "@/api/apis";
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      value3: "",
      // 模态框
      dialogVisible: false,
      orderNo_input: "",
      date1: "",
      phone_input: "",
      consignee_input: "",
      deliverAddress_input: "",
      date2: "",
      remarks_input: "",
      orderAmount_input: "",
      id: "",
      //模态框的下拉列表
      cateName: "",
      option: [
        {
          value: "已完成"
          
        },
        {
          value: "已受理"
        },
        {
          value: "派送中"
        }
      ],
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      options: [
        {
          value: "已完成"
        },
        {
          value: "已受理"
        },
        {
          value: "派送中"
        }
      ],
      value: "",
      // 分页器
      currentPage: 1,
      pageSize: 5,
      total: 0
      //////////////////////////
    };
  },

  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.orderlist(this.currentPage);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.orderlist(val);
    },
    // 封装的分页器
    orderlist(currentPage) {
      ORDERLIST(currentPage, this.pageSize).then(res => {
        // 下单时间转换
        let arr1 = [];
        for (let i of res.data.data) {
         
          arr1.push(i.orderTime.substring(0, 19).replace(/T/, " "));
        }
        // 转换数据库接收到的日期时间

        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].orderTime = arr1[i];
        }
        //////////////////////////下单时间转换
        //送达时间转换
        let arr = [];
        for (let i of res.data.data) {
          arr.push(i.deliveryTime.substring(0, 19).replace(/T/, " "));
        }
        // 转换数据库接收到的日期时间

        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].deliveryTime = arr[i];
        }
        ////////////////////////////送达时间转换
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 点击查询
    query_btn() {
      // console.log(this.input1,this.input2,this.input3,this.value2);
      // 获取的时间范围
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
      // console.log(JSON.stringify(arr) );

      QUERYLIST(
       1,
        5,
        this.input1,
        this.input2,
        this.input3,
        this.value3,
        JSON.stringify(dateArr)
      ).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    // 点击编辑进入模态框
    edit_btn(row) {
      this.dialogVisible = true;
      this.id = row.id;
      (this.orderNo_input = row.orderNo),
        (this.date1 = row.deliveryTime),
        (this.phone_input = row.phone),
        (this.consignee_input = row.consignee),
        (this.deliverAddress_input = row.deliverAddress),
        (this.date2 = row.orderTime),
        (this.remarks_input = row.remarks),
        (this.orderAmount_input = row.orderAmount),
        //模态框的下拉列表
        (this.cateName = row.orderState);
    },
    //点击模态框里面的确定发送ajax
    modal_btn() {
      // 获取的时间范围

      let d = new Date(this.date1);
      let year = d.getFullYear();
      let mouth =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;

      let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

      let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();

      let minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

      let seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

      this.date1 =
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
        seconds;

      let d1 = new Date(this.date2);
      let year1 = d1.getFullYear();
      let mouth1 =
        d1.getMonth() + 1 < 10 ? "0" + (d1.getMonth() + 1) : d1.getMonth() + 1;

      let date1 = d1.getDate() < 10 ? "0" + d1.getDate() : d1.getDate();

      let hours1 = d1.getHours() < 10 ? "0" + d1.getHours() : d1.getHours();

      let minute1 =
        d1.getMinutes() < 10 ? "0" + d1.getMinutes() : d1.getMinutes();

      let seconds1 =
        d1.getSeconds() < 10 ? "0" + d1.getSeconds() : d1.getSeconds();

      this.date2 =
        year1 +
        "-" +
        mouth1 +
        "-" +
        date1 +
        " " +
        hours1 +
        ":" +
        minute1 +
        ":" +
        seconds1;

      this.dialogVisible = false;
      EDITORDER(
        this.id,
        this.orderNo_input,
        this.date1,
        this.phone_input,
        this.consignee_input,
        this.deliverAddress_input,
        this.date2,
        this.remarks_input,
        this.orderAmount_input,
        this.cateName
      ).then(res => {
      if(res.data.code==0){
         this.$message({
          message: '修改成功',
          type: 'success'
        });
      }
      });
         // 进入页面的渲染列表
    this.orderlist(this.currentPage);
    }
  },
  created() {
    // 进入页面的渲染列表
    this.orderlist(this.currentPage);
  }
};
</script>

<style lang="less" scoped>
#data_box {
  margin-left: 20px;
  width: 100%;
  height: 100%;
  // background: chartreuse;
  #search {
    .input {
      width: 200px;
      margin-bottom: 20px;
    }
  }
  #table_box {
    // width: 100%;
    // height: 100%;
    width: 1200px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>