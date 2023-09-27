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
import { useCodeSpacesStore } from "@/store/codespaceURL";

export default {
  name: "HeaderComp",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    // Retrieve data from Local Storage on component initialization
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online, codespaces };
  },

  methods: {
    async submitLogout() {
      const codespaces = useCodeSpacesStore();
      await fetch(`${codespaces.csURL}api/user/logout`, {
        method: "get",
      })
        .then((res) => {
          console.log(res);
          // return res.text();
        })
        .then((data) => {
          console.log(data);
        });
      localStorage.removeItem("lastUserInfo");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
