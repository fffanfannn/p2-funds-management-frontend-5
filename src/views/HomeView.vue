<template>
  <div>
    <h5>customize tag</h5>
    <button @click="addTag">+</button>
    <button @click="confirmTag">confirm</button>
    <div v-for="(tag, index) in tags" :key="index">
      <input type="text" v-model="tag.name" />
      <button @click="removeTag(index)">-</button>
    </div>

    <ul>
      <li v-for="(tag, index) in confirmedTags" :key="index">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";
import { ref } from "vue";

export default {
  name: "HomeView",

  setup() {
    const online = useOnlineStore();
    const tags = ref([{ name: "tag" }]);
    const confirmedTags = ref([]); // Use ref here

    const addTag = () => {
      tags.value.push({ name: "tag" });
    };

    const removeTag = (index) => {
      if (tags.value.length > 1) {
        tags.value.splice(index, 1);
      }
    };

    const confirmTag = () => {
      confirmedTags.value = tags.value.map((tag) => tag.name);
      console.log("confirm", confirmedTags);
      console.log("confirmtypeof", typeof confirmedTags.value);
      for (let tagName of confirmedTags.value) {
        online.customizeTag(tagName);
      }
    };

    return { online, tags, addTag, removeTag, confirmTag, confirmedTags };
  },
};
</script>
