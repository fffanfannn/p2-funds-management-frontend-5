<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
  <h5>customize tag</h5>
  <p>{{ online.test }}</p>

  <div v-for="(tag, index) in tags" :key="index">
    <div>{{ tags }}</div>
    <input type="text" value="abc" />
    <button @click="addTag(index)">+</button>
    <button>-</button>
  </div>
  <button @click="getAllInputValues">Get All Input Values</button>
  <h5>your tags</h5>
  <ul>
    <li v-for="(tag, index) in tags" :key="index">{{ tag.name }}</li>
  </ul>
</template>

<script>
// @ is an alias to /src
import { useOnlineStore } from "@/store/online";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup() {
    const online = useOnlineStore();
    const tags = [{ name: "" }];
    // Retrieve data from Local Storage on component initialization
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online, tags };
  },
  methods: {
    addTag(index) {
      this.tags.splice(index + 1, 0, { name: "" });
      console.log("addTag", this.tags, index);
      for (let tag of this.tags) {
        this.online.addTest(tag);
      }
    },

    getAllInputValues() {
      const inputValues = this.tags.map((tag) => tag.name);
      console.log("All Input Values:", inputValues);
    },
  },
};
</script>
