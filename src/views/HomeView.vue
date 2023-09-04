<template>
  <div>
    <h5>Customize Tags</h5>
    <button @click="addTag">+</button>
    <button @click="confirmTag">confirm</button>
    <div v-for="(tag, index) in tags" :key="index">
      <input type="text" v-model="tag.name" />
      <button @click="removeTag(index)">-</button>
    </div>

    <ul>
      My Tags
      <li v-for="(tag, index) in confirmedTags" :key="index">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";
import { useCodeSpacesStore } from "@/store/codespaceURL";
import { ref } from "vue";

export default {
  name: "HomeView",

  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
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

    const confirmTag = async () => {
      confirmedTags.value = tags.value.map((tag) => tag.name);
      console.log("confirm", confirmedTags);
      console.log("confirmtypeof", typeof confirmedTags.value);
      // for (let tagName of confirmedTags.value) {
      //   online.customizeTag(tagName);
      // }
      try {
        const formData = { myTags2: confirmedTags.value };

        const postResponse = await fetch(
          `${codespaces.csURL}api/user/tags/${online.loginUserEach[0]._id}`,
          {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const postData = await postResponse.json();
        console.log("posttagdata", postData);

        const reponseGetData = await fetch(
          `${codespaces.csURL}api/user/tags/${online.loginUserEach[0]._id}`
        );
        const GetData = await reponseGetData.json();
        console.log("gettagdata", GetData);
        console.log("gettagdatamyTags1", GetData[0].myTags2);
        for (let tagName of GetData[0].myTags2) {
          online.customizeTag(tagName);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    return {
      online,
      codespaces,
      tags,
      addTag,
      removeTag,
      confirmTag,
      confirmedTags,
    };
  },
};
</script>
