<template>
  <div>
    <div ref="mychart" id="demoDiv"></div>
    <h1>Welcome page</h1>
    <router-link to="Register">Sign up</router-link>
    <router-link to="Login">Log in</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
// import { ref } from "vue";
import * as echarts from "echarts";
export default {
  mounted() {
    let myEcharts = echarts.init(this.$refs.mychart);
    myEcharts.setOption({
      title: {
        text: "hello world",
      },
      xAxis: {
        type: "category",
        data: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "bar",
          data: [155, 220, 326, 105, 147, 260],
        },
      ],
    });
  },
};

// const option = ref({
//   xAxis: {
//     type: "category",
//     data: ["mon", "tue", "wed", "thur", "fri", "sat", "sun"],
//   },
//   yAxis: {
//     type: "value",
//   },
//   series: [
//     {
//       type: "line",
//       data: [155, 220, 326, 105, 147, 260],
//     },
//   ],
// });
</script>

<style>
#demoDiv {
  width: 600px;
  height: 400px;
  border: 1px solid #ccc;
}
</style>
