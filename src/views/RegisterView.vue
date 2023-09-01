<template>
  <div>
    <h1>Sign Up</h1>
    <form>
      *<input
        type="text"
        id="name"
        name="name"
        placeholder="Username"
        required
      />
      *<input
        type="email"
        id="email"
        name="passord"
        placeholder="Email"
        required
      />
      *<input
        type="password"
        id="password"
        name="passord"
        placeholder="Password"
        required
      />
      <button type="submit" @click="submitRegister">Sign Up</button>
    </form>
    <p>{{ registerNote }}</p>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "RegisterView",
  data() {
    return {
      registerNote: "",
    };
  },
  methods: {
    submitRegister() {
      const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        const formData = { name, email, password };
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
            console.log(res);
            if (res.status == 200) {
              this.registerNote = "Register success";
              setTimeout(() => {
                this.$router.push("/login");
              }, 1500);
            } else {
              this.registerNote = "Username or email already exists";
            }
            return res.text();
          })
          .then((data) => {
            console.log(data);
          });
      });
    },
  },
};
</script>
