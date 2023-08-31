<template>
  <div>
    <h1>This is a login page</h1>
    <form>
      <input type="text" id="name" name="name" placeholder="Name" />
      <input type="text" id="age" name="age" placeholder="Age" />
      <button type="submit" @click="submitLogin">Login</button>
    </form>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "LoginView",
  methods: {
    submitLogin() {
      const codespaces = useCodeSpacesStore();
      const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = document.querySelector("#name").value;
        let age = document.querySelector("#age").value;
        const formData = { name, age };
        fetch(`${codespaces.csURL}api/user/login`, {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then(async (res) => {
            console.log(res);
            const getStatusMsg = await res.json();
            if (res.status == 200) {
              alert(JSON.stringify(getStatusMsg));
              this.$router.push("/main");
            } else {
              alert(JSON.stringify(getStatusMsg));
            }
            // return res.text();
          })
          .then((data) => {
            console.log(data);
          });
      });
    },
  },
};
</script>
