<template>
  <div>
    <h4>header component</h4>
    Welcome
    <p>{{ online.loginUserEach[0].userType }}:</p>
    <p>{{ online.loginUserEach[0].name }}</p>
    <p>{{ vipMsg }}</p>
    <button @click="submitLogout">Log out</button>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";

export default {
  name: "HeaderComp",
  setup() {
    const online = useOnlineStore();
    // Retrieve data from Local Storage on component initialization
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online };
  },
  data() {
    return {
      counter: 1,
      vipMsg: "",
    };
  },
  methods: {
    submitLogout() {
      localStorage.removeItem("lastUserInfo");
      this.$router.push({ name: "Login" });
    },
  },
  created() {
    if (this.online.loginUserEach[0].isVip === true) {
      this.vipMsg = "VIP";
    } else {
      this.vipMsg = "";
    }
  },
};
</script>
