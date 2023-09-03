<template>
  <div v-if="online.loginUserEach[0].isVip">
    <h4>chart component</h4>
    <p>{{ dataNote }}</p>
    <p>{{ online.users }}</p>
    <echarts class="echart" :option="option3" />
    <echarts class="echart" :option="option4" />
    <echarts class="echart" :option="option5" />
  </div>
  <div v-if="!online.loginUserEach[0].isVip">
    <h4>chart component</h4>
    <p>Please join us as VIP users</p>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useOnlineStore } from "@/store/online";
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "ChartComp",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    const dataNote = ref("");
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }

    online.users = [];

    fetch(`${codespaces.csURL}api/account/user/${online.loginUserEach[0]._id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          dataNote.value = "Please create new data";
        } else {
          console.log(data);
          for (let user of data) {
            online.addUser(user);
          }
        }
      });

    const option3 = ref({
      title: {
        text: "Income Chart",
      },
      xAxis: {
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "line",
          smooth: true,
          // areaStyle: {},
          data: [],
        },
      ],
    });

    const option4 = ref({
      title: {
        text: "Expense Chart",
      },
      xAxis: {
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "line",
          smooth: true,
          // areaStyle: {},
          data: [],
        },
      ],
    });

    const option5 = ref({
      title: {
        text: "Income/Expense Pie",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },

      series: [
        {
          type: "pie",
          radius: ["50%", "70%"],
          // roseType: "area",
          data: [],
        },
      ],
    });

    watch(online.users, () => {
      // Update option3 based on online.users data

      online.users.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
      let incomeArray = online.users.filter((user) => user.type == "Income");
      let expenseArray = online.users.filter((user) => user.type == "Expense");
      option3.value.xAxis.data = incomeArray.map((user) => user.date);
      option3.value.series[0].data = incomeArray.map((user) => user.amount);
      option4.value.xAxis.data = expenseArray.map((user) => user.date);
      option4.value.series[0].data = expenseArray.map((user) => user.amount);
      let incomeAmount = incomeArray.reduce(
        (total, user) => total + user.amount,
        0
      );
      let expenseAmount = expenseArray.reduce(
        (total, user) => total + user.amount,
        0
      );
      option5.value.series[0].data = [
        { value: incomeAmount, name: "Income" },
        { value: expenseAmount, name: "Expense" }, // You can replace this with your desired data
      ];
    });

    return { online, codespaces, dataNote, option3, option4, option5 };
  },
};
</script>

<style>
.echart {
  width: 600px;
  height: 400px;
  border: 1px solid #ccc;
  /* padding: 1rem; */
}
</style>
