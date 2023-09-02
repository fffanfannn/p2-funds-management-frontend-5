<template>
  <div>
    <h4>side bar component</h4>
    <div>
      <router-link
        :to="{ name: 'Home', params: { id: online.loginUserEach[0].name } }"
        >Home</router-link
      >
      <router-link
        :to="{ name: 'Userdata', params: { id: online.loginUserEach[0].name } }"
        >My Data</router-link
      >
    </div>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";

export default {
  name: "SideBarComp",
  setup() {
    const online = useOnlineStore();
    // Retrieve data from Local Storage on component initialization
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online };
  },
};
</script>
