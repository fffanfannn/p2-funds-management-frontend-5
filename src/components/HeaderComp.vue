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
        :to="{ name: 'Userdata', params: { id: online.loginUserEach[0].name } }"
        >My Data</router-link
      >

      <h5>customize tag</h5>
      <input type="text" value="abc" />
      <button @click="addTag(index)">+</button>

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
    </div>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";

export default {
  name: "HeaderComp",
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
  data() {
    return {
      counter: 1,
    };
  },
  methods: {
    submitLogout() {
      localStorage.removeItem("lastUserInfo");
      this.$router.push({ name: "Login" });
    },

    // addTags() {
    //   this.counter++;
    //   console.log("counter", typeof this.counter);
    //   return this.counter;
    // },
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
