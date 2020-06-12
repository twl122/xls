<template>
  <div id="man">
    <div>
      <div class="box">
        <img src="../assets/imgs/1.png" alt />
        <div>
          <div>总订单</div>
          <div>{{totalOrder}}</div>
        </div>
      </div>
      <div class="box">
        <img src="../assets/imgs/2.png" alt />
        <div>
          <div>总销售额</div>
          <div>{{totalAmount}}</div>
        </div>
      </div>
      <div class="box">
        <img src="../assets/imgs/3.png" alt />
        <div>
          <div>今日订单</div>
          <div>{{todayOrder}}</div>
        </div>
      </div>
      <div class="box">
        <img src="../assets/imgs/4.png" alt />
        <div>
          <div>今日销售额</div>
          <div>{{totayAmount}}</div>
        </div>
      </div>
    </div>

    <div id="echarts_box"></div>
  </div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
//引入 首页报表接口
import { INDEX_echarts } from "@/api/apis";
export default {
  data() {
    return {
      todayOrder: "",
      totalAmount: "",
      totalOrder: "",

      totayAmount: ""
    };
  },
  mounted() {
    //  发送ajax获取图表信息
    INDEX_echarts().then(res => {
      var option = {
        title: {
          text: "数据"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数据", "金额数据"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          // x轴的数据
          data: res.data.xData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数据",

            type: "line",
            stack: "总量",
            data: res.data.orderData
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData
          }
        ]
      };
      // 初始化echarts
      echarts.init(document.querySelector("#echarts_box")).setOption(option);
      this.todayOrder=res.data.todayOrder;
      this.totalAmount=res.data.totalAmount;
      this.totalOrder=res.data.totalOrder;
      this.totayAmount=res.data.totayAmount;
    });

    // todayOrder
    // totalAmount
    // totalOrder
    // totayAmount
  }
};
</script>

<style lang="less">
#man {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  & > div:nth-child(1) {
    display: flex;
    justify-content: space-around;
  }
  #echarts_box {
    width: 100%;
    height: 500px;
    margin-top: 20px;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
.box {
  display: flex;
  background: white;
  width: 200px;
  height: 80px;
  margin-top: 20px;
  img {
    margin-left: 20px;
  }
  & > div {
    margin-left: 10px;
    margin-top: 20px;
  }
}
</style>