<template>
  <div>
    <h4>dialogComp.vue</h4>
    <form action="">
      <input
        type="text"
        v-model="name"
        id="name"
        name="name"
        placeholder="Name"
      />
      <input type="text" v-model="age" id="age" name="age" placeholder="Age" />
      <button type="submit" @click="submitCreate">Create</button>
    </form>
    <button>close</button>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "DialogComp",
  setup() {
    const codespaces = useCodeSpacesStore();
    return { codespaces };
  },
  data() {
    return {
      name: "",
      age: "",
    };
  },
  methods: {
    submitCreate() {
      const codespaces = useCodeSpacesStore();
      const form = document.querySelector("form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        // let name = document.querySelector("#name1").value;
        // let age = document.querySelector("#age1").value;
        const formData = { name: this.name, age: this.age };
        console.log(formData, "formData");
        await fetch(`${codespaces.csURL}api/account/add`, {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((res) => {
            console.log(res);
            alert("Account item created successfully");
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
