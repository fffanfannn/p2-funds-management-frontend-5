<template>
  <div>
    <h4>header component</h4>
    <div>
      <router-link to="/main/home">Home</router-link>
      <router-link to="/main/userList">User-List</router-link>
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
    return { online };
  },

  //   created() {
  //     console.log("11");
  //     fetch(
  //       "https://glowing-space-happiness-x65647x7qw4c6j4g-3000.app.github.dev/api/user/login",
  //       {
  //         method: "post",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // 'Content-Type': 'application/x-www-form-urlencoded',
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("created() data:", data);
  //         for (let user of data) {
  //           this.online.addUser(user);
  //         }
  //       });
  //   },
};
</script>
