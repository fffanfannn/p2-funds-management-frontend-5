<template>
  <div class="sideBar">
    <router-link
      :to="{ name: 'Home', params: { id: online.loginUserEach[0].name } }"
      @click="clickSideBarBtn1"
      :class="{ sideBarBtn1: sideBarBtn1 }"
      >My Account</router-link
    >
    <router-link
      :to="{ name: 'Userdata', params: { id: online.loginUserEach[0].name } }"
      @click="clickSideBarBtn2"
      :class="{ sideBarBtn2: sideBarBtn2 }"
      >My Data</router-link
    >
    <router-link
      :to="{
        name: 'Statistics',
        params: { id: online.loginUserEach[0].name },
      }"
      @click="clickSideBarBtn3"
      :class="{ sideBarBtn3: sideBarBtn3 }"
      >My Report</router-link
    >
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
  data() {
    return {
      sideBarBtn1: false,
      sideBarBtn2: true,
      sideBarBtn3: false,
    };
  },
  methods: {
    clickSideBarBtn1() {
      this.sideBarBtn1 = true;
      this.sideBarBtn2 = false;
      this.sideBarBtn3 = false;
    },
    clickSideBarBtn2() {
      this.sideBarBtn1 = false;
      this.sideBarBtn2 = true;
      this.sideBarBtn3 = false;
    },
    clickSideBarBtn3() {
      this.sideBarBtn1 = false;
      this.sideBarBtn2 = false;
      this.sideBarBtn3 = true;
    },
  },
};
</script>
