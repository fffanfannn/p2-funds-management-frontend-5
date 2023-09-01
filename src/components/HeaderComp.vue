<template>
  <div>
    <h4>header component</h4>
    <p>user: {{ online.loginUserEach[0].name }}</p>
    <button @click="submitLogout">Log out</button>
    <div>
      <router-link
        :to="{ name: 'Home', params: { id: online.loginUserEach[0].name } }"
        >Home</router-link
      >
      <router-link
        :to="{ name: 'Userlist', params: { id: online.loginUserEach[0].name } }"
        >User-List</router-link
      >
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
