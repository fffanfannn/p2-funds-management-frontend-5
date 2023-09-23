<template>
  <section class="welcomeHeader">
    <div class="container">
      <div class="headerContent">
        <div class="logo">Transaction Management</div>
        <div>
          <router-link to="Register">Sign up</router-link>
          <router-link to="Login">Sign in</router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="welcomePage">
    <div class="container">
      <div class="pageContent">
        <div class="leftdiv">
          <h1>Your Transaction Report</h1>
          <echarts class="echart" :option="option1" />
        </div>
        <div class="rightdiv">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "WelcomeView",
  setup() {
    const data = ref([
      { value: 50, name: "Mon" },
      { value: 125, name: "Tue" },
      { value: 245, name: "Wed" },
      { value: 147, name: "Thur" },
      { value: 260, name: "Fri" },
      { value: 105, name: "Sat" },
      { value: 326, name: "Sun" },
    ]);

    setInterval(() => {
      data.value = data.value.map((item) => ({
        ...item,
        value: Math.random() * 100,
      }));
    }, 3000);

    const data1 = ref([
      { value: 326, name: "Mon" },
      { value: 175, name: "Tue" },
      { value: 60, name: "Wed" },
      { value: 47, name: "Thur" },
      { value: 245, name: "Fri" },
      { value: 125, name: "Sat" },
      { value: 50, name: "Sun" },
    ]);

    setInterval(() => {
      data1.value = data1.value.map((item) => ({
        ...item,
        value: Math.random() * 100,
      }));
    }, 3000);

    const option1 = computed(() => {
      return {
        legend: {},
        xAxis: {
          data: data.value.map((d) => d.name),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Income",
            type: "line",
            smooth: true,
            areaStyle: {},
            data: data.value.map((d) => d.value),
            itemStyle: {
              normal: {
                barBorderColor: "rgb(25, 183, 207, 0.7)",
                color: "rgb(25, 183, 207, 0.7)",
              },
            },
          },
          {
            name: "Expense",
            type: "line",
            smooth: true,
            areaStyle: {},
            data: data1.value.map((d) => d.value),
            itemStyle: {
              normal: {
                barBorderColor: "rgb(245, 140, 143, 0.7)",
                color: "rgb(245, 140, 143, 0.7)",
              },
            },
          },
        ],
      };
    });

    return {
      option1,
    };
  },
};
</script>
