<template>
  <h5>customize tag</h5>
  <input type="text" />
  <button @click="addTag">+</button>
  <button @click="removeTag">-</button>

  <!-- <h5>your tags</h5>
  <ul>
    <li v-for="(tag, index) in tags" :key="index">{{ tag.name }}</li>
  </ul> -->
</template>

<script>
// @ is an alias to /src
import { useOnlineStore } from "@/store/online";

export default {
  name: "HomeView",

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
    addTag() {},
  },
};
</script>
