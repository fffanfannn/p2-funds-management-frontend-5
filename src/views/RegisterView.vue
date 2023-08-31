<template>
  <div>
    <h1>This is a register page</h1>
    <form>
      <input type="text" id="name" name="name" placeholder="Name" />
      <input type="text" id="age" name="age" placeholder="Age" />
      <button type="submit" @click="submitRegister">Submit</button>
    </form>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "RegisterView",
  methods: {
    submitRegister() {
      const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = document.querySelector("#name").value;
        let age = document.querySelector("#age").value;
        const formData = { name, age };
        const codespaces = useCodeSpacesStore();
        fetch(`${codespaces.csURL}api/user/register`, {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((res) => {
            console.log("testAPI() res:", res);
            if (res.status == 200) {
              alert("Register success");
              this.$router.push("/login");
            } else {
              alert("Register failed");
            }
            // return res.text();
          })
          .then((data) => {
            console.log("testAPI() data:", data);
          });
      });
    },
  },
};
</script>
