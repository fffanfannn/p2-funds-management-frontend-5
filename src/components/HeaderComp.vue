<template>
  <div>
    <h4>header component</h4>
    <p>user: {{ online.loginUserEach[0].name }}</p>
    <div>
      <router-link to="Home">Home</router-link>
      <router-link to="userlist">User-List</router-link>
    </div>
    <!-- <ul>
      <li v-for="user in online.users" :key="user.id">{{ user.name }}</li>
    </ul> -->
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
};
</script>
