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
      align="right">
    </el-date-picker>
      <el-button type="primary">查询</el-button>
  </div>
  
<div>

</div>

  </div>
</template>

<script>
    export default {
           data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
      };
    }
    }
</script>

<style lang="less" scoped>

#cs{
    background: #F0F2F5;
    height: 100%;
&>div:nth-child(1){
   padding-top: 20px;
   padding-left: 20px;
   span{
       margin-right: 20px;
   };
  button{
       margin-left: 20px;
 
      
   }
}
    &>div:nth-child(2){
        width: 900px;
        height: 500px;
        background: white;
        margin: 30px 0 0 100px;
    }
}

</style>