<template>
  <div class="reportPage">
    <h4>{{ online.loginUserEach[0].name }} report</h4>
    <p class="noteInfo">{{ dataNote }}</p>
    <div v-if="online.loginUserEach[0].isVip">
      <p>Total Income: ${{ incomeAmountTemp }}</p>
      <p>Total Expense: ${{ expenseAmountTemp }}</p>
      <p>My Balance: ${{ balanceAmountTemp }}</p>
      <p>My Tags:</p>
      <div v-for="tagValue in tagsAmountTemp" :key="tagValue.name">
        <p>{{ tagValue.name }} : {{ tagValue.value }}</p>
      </div>

      <div class="allecharts">
        <div>
          <echarts class="echart" :option="option6" />
          <echarts class="echart" :option="option7" />
        </div>
        <div>
          <echarts class="echart" :option="option5" />
          <echarts class="echart" :option="option8" />
        </div>
      </div>
    </div>
    <div v-if="!online.loginUserEach[0].isVip">
      <p class="noteInfo">Please join us as a VIP user</p>
      <echarts class="echart" :option="option1" />
      <echarts class="echart" :option="option2" />
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import { useOnlineStore } from "@/store/online";
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "ChartComp",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    const dataNote = ref("");
    let incomeAmountTemp = ref(0);
    let expenseAmountTemp = ref(0);
    let balanceAmountTemp = ref(0);
    let tagsAmountTemp = ref({});

    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }

    online.users = [];
    online.customizeTags = [];

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

    fetch(`${codespaces.csURL}api/user/tags/${online.loginUserEach[0]._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        console.log("datafrom tag API", data[0].myTags2);
        if (!data[0].myTags2) {
          dataNote.value = "Please create new data";
        } else {
          for (let user of data[0].myTags2) {
            online.customizeTag(user);
          }
        }
      });

    const option5 = ref({
      animationDuration: 3000,
      title: {
        text: "Income/Expense Total Pie",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },

      series: [
        {
          type: "pie",
          radius: ["50%", "70%"],
          data: [],
          color: ["rgb(25, 183, 207)", "rgb(245, 140, 143)"],
        },
      ],
    });

    const option8 = ref({
      animationDuration: 3000,
      title: {
        text: "Amount by Tags",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },

      series: [
        {
          type: "pie",
          radius: ["10%", "70%"],
          roseType: "area",
          data: [],
        },
      ],
    });

    const option6 = ref({
      animationDuration: 2000,
      title: {
        text: "Amount by Date",
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
        text: "Income/Expense Line",
      },
      legend: { left: "right" },
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
      incomeAmountTemp.value = incomeAmount;

      let expenseAmount = expenseArray.reduce(
        (total, user) => total + user.amount,
        0
      );
      expenseAmountTemp.value = expenseAmount;
      balanceAmountTemp.value = incomeAmount - expenseAmount;

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

    watch(online.customizeTags, () => {
      console.log("tagname", online.customizeTags);
      for (let tagName of online.customizeTags) {
        console.log("tagnamein loop", tagName);
        let tagAmount = online.users.reduce((total, user) => {
          if (user.tag == tagName) {
            return total + user.amount;
          } else {
            return total;
          }
        }, 0);

        console.log("tagAmount", tagAmount);
        option8.value.series[0].data.push({
          value: tagAmount,
          name: tagName,
        });
      }

      tagsAmountTemp.value = option8.value.series[0].data;
    });

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

    return {
      online,
      codespaces,
      dataNote,
      option1,
      option2,
      option5,
      option6,
      option7,
      option8,
      incomeAmountTemp,
      expenseAmountTemp,
      balanceAmountTemp,
      tagsAmountTemp,
    };
  },
};
</script>
