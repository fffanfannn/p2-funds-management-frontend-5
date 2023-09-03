<template>
  <div>
    <h1>Welcome page</h1>
    <router-link to="Register">Sign up</router-link>
    <router-link to="Login">Log in</router-link>
    <div style="display: flex; justify-content: center">
      <echarts class="echart" :option="option1" />
      <echarts class="echart" :option="option2" />
    </div>
    <router-view></router-view>
  </div>
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
      { value: 50, name: "Mon" },
      { value: 125, name: "Tue" },
      { value: 245, name: "Wed" },
      { value: 147, name: "Thur" },
      { value: 260, name: "Fri" },
      { value: 105, name: "Sat" },
      { value: 326, name: "Sun" },
    ]);

    setInterval(() => {
      data1.value = data1.value.map((item) => ({
        ...item,
        value: Math.random() * 100,
      }));
    }, 3000);

    const option1 = computed(() => {
      return {
        title: {
          text: "Sample Chart",
        },
        legend: {},
        xAxis: {
          data: data.value.map((d) => d.name),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
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

    const option2 = computed(() => {
      return {
        title: {
          text: "Sample Chart",
          left: "center",
        },

        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            data: data.value.map((d) => ({
              value: d.value,
              name: d.name,
            })),
            radius: ["20%", "70%"],
            roseType: "area",
          },
        ],
      };
    });

    return { option1, option2 };
  },
};
</script>

<style>
.echart {
  width: 600px;
  height: 400px;
  border: 1px solid #ccc;
}
</style>
