<template>
  <div>
    <h4>searchComp.vue</h4>

    <input
      type="text"
      v-model="searchInput"
      id="name"
      name="name"
      @input="searchBtn"
    />

    <div v-if="searchInput">
      <div v-for="item in searchResults" :key="item._id">
        <p>{{ item.name }}</p>
        <p>{{ item.age }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "EditComp",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    return { online, codespaces };
  },
  props: {
    userData: Object,
  },

  data() {
    return {
      searchInput: "",
      searchResults: [],
    };
  },
  methods: {
    searchBtn() {
      this.searchResults = [];
      for (let user of this.online.users) {
        let searchRegExp = new RegExp(this.searchInput, "gi");
        if (searchRegExp.test(user.name)) {
          console.log(user);
          this.searchResults.push(user);
          console.log(this.searchResults);
        }
      }
    },
  },
};
</script>
