<template>
  <div id="cs">
    <div class="block">
      <span class="demonstration">时间范围:</span>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary" @click="query">查询</el-button>
    </div>

    <div id="echarts_box">daasd</div>
  </div>
</template>

<script>
//引入echarts报表
import echarts from "echarts";
////引入 订单统计报表接口
import { ORDER_echarts } from "@/api/apis";
export default {
  data() {
    return {
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
      value3:'',
      orderTime: [],
      orderAmount: []
    };
  },
  methods: {
    // query() {
    
    // }
//  封装查询图表
queryEcharts(arr){

    let dateArr = [];
    for (let i of arr) {
      let d = new Date(i);
      let year = d.getFullYear();
      let mouth =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;

      let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

      let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();

      let minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

      let seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

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
    ORDER_echarts(JSON.stringify(dateArr)).then(res => {
      //  console.log(res.data.data.orderTime);

      let aa = res.data.data.map(i => {
        return i.orderTime.substring(0,19).replace(/T/," ");
      });
      let bb = res.data.data.map(i => {
        return i.orderAmount;
      });

      let option = {
        xAxis: {
          type: "category",
          data: aa
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: bb,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      };

      echarts.init(document.querySelector("#echarts_box")).setOption(option);
    });


},

query(){




    let dateArr = [];
    for (let i of this.value2) {
      let d = new Date(i);
      let year = d.getFullYear();
      let mouth =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;

      let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

      let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();

      let minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();

      let seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();

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
    ORDER_echarts(JSON.stringify(dateArr)).then(res => {
      //  console.log(res.data.data.orderTime);

      let aa = res.data.data.map(i => {
        return i.orderTime.substring(0,19).replace(/T/," ");
      });
      let bb = res.data.data.map(i => {
        return i.orderAmount;
      });

      let option = {
        xAxis: {
          type: "category",
          data: aa
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: bb,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)"
            }
          }
        ]
      };

      echarts.init(document.querySelector("#echarts_box")).setOption(option);
    });






  
}


  },
  mounted() {
  this.queryEcharts(this.value2)
   
   



  }
};
</script>

<style lang="less" scoped>
#cs {
  background: #f0f2f5;
  height: 100%;
  & > div:nth-child(1) {
    padding-top: 20px;
    padding-left: 20px;
    span {
      margin-right: 20px;
    }
    button {
      margin-left: 20px;
    }
  }
  #echarts_box {
    width: 900px;
    height: 500px;
    background: white;
    margin: 30px 0 0 100px;
  }
}
</style>