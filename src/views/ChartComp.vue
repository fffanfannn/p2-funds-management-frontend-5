<template>
  <div v-if="online.loginUserEach[0].isVip">
    <h4>chart component</h4>
    <p>{{ dataNote }}</p>
    <echarts class="echart" :option="option6" />
    <echarts class="echart" :option="option7" />
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

    const option5 = ref({
      animationDuration: 3000,
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
          radius: ["10%", "70%"],
          roseType: "area",
          data: [],
          color: ["rgb(25, 183, 207)", "rgb(245, 140, 143)"],
        },
      ],
    });

    const option6 = ref({
      animationDuration: 2000,
      title: {
        text: "Income Chart",
      },

      yAxis: {
        data: [],
      },
      xAxis: {
        type: "value",
      },
      series: [
        {
          name: "By date",
          type: "bar",
          itemStyle: {
            normal: {
              barBorderColor: "rgb(25, 183, 207)",
              color: "rgb(25, 183, 207)",
            },
          },
          data: [],
        },
      ],
    });

    const option7 = ref({
      animationDuration: 2000,
      title: {
        text: "Income Expense Line",
      },
      legend: {},
      xAxis: {
        data: [],
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
          data: [],
          markPoint: {
            data: [{ type: "max", name: "max" }],
          },
          itemStyle: {
            normal: {
              barBorderColor: "rgb(25, 183, 207)",
              color: "rgb(25, 183, 207)",
            },
          },
        },
        {
          name: "Expense",
          type: "line",
          smooth: true,
          areaStyle: {},
          data: [],
          markPoint: {
            data: [{ type: "max", name: "max" }],
          },
          itemStyle: {
            normal: {
              barBorderColor: "rgb(245, 140, 143)",
              color: "rgb(245, 140, 143)",
            },
          },
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
      option6.value.yAxis.data = online.users.map((user) => user.date);
      option6.value.series[0].data = online.users.map((user) => {
        if (user.type == "Income") {
          return user.amount;
        } else {
          return -user.amount;
        }
      });
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
      option7.value.xAxis.data = online.users.map((user) => user.date);
      option7.value.series[0].data = online.users.map((user) => {
        if (user.type == "Income") {
          return user.amount;
        } else {
          return 0;
        }
      });
      option7.value.series[1].data = online.users.map((user) => {
        if (user.type == "Expense") {
          return user.amount;
        } else {
          return 0;
        }
      });
    });

    return {
      online,
      codespaces,
      dataNote,
      option5,
      option6,
      option7,
    };
  },
};
</script>

<style>
.echart {
  width: 600px;
  height: 400px;
  border: 1px solid darkgrey;
  /* padding: 1rem; */
}
</style>
