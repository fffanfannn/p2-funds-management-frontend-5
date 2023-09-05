<template>
  <div class="mainPageHeaderContent">
    <div class="container">
      <div class="mainPageHeaderContent">
        <div class="logo">Transaction Management</div>
        <div class="userHeader">
          <p>
            Welcome {{ online.loginUserEach[0].userType }}:
            {{ online.loginUserEach[0].name }}
            {{ online.loginUserEach[0].isVip ? "VIP" : "" }}
          </p>

          <button @click="submitLogout">Log out</button>
        </div>
      </div>
    </div>
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

  methods: {
    submitLogout() {
      localStorage.removeItem("lastUserInfo");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
