<template>
  <div>
    <h4>editComp.vue</h4>
    <form action="">
      <input type="text" v-model="nameNew" id="name" name="name" />
      <input type="text" v-model="ageNew" id="age" name="age" />
      <button type="submit" @click="submitUpdate">Update</button>
    </form>
    <button>close</button>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "EditComp",
  setup() {
    const codespaces = useCodeSpacesStore();
    return { codespaces };
  },
  props: {
    userData: Object,
  },

  data() {
    return {
      nameNew: "",
      ageNew: "",
    };
  },
  methods: {
    submitUpdate() {
      const codespaces = useCodeSpacesStore();
      const form = document.querySelector("form");
      console.log(form);
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log(this.userData._id, "this.userData._id");
        const formData = {
          name: this.nameNew,
          age: this.ageNew,
        };
        console.log(formData, "formData");
        await fetch(
          `${codespaces.csURL}api/account/edit/${this.userData._id}`,
          {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
          .then((res) => {
            console.log(res);
            alert("item updated successfully");
            return res.text();
          })
          .then((data) => {
            console.log(data);
          });
        location.reload();
      });
    },
  },
};
</script>
