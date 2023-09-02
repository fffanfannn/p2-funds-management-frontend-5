<template>
  <div>
    <h1>This is a login page</h1>
    <form>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Username"
        required
      />
      <input
        type="password"
        id="password"
        name="passord"
        placeholder="Password"
        required
      />
      <button type="submit" @click="submitLogin">Login</button>
    </form>
  </div>
  <p>{{ loginNote }}</p>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
import { useOnlineStore } from "@/store/online";
export default {
  name: "LoginView",
  data() {
    return {
      loginNote: "",
    };
  },
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();

    // Retrieve data from Local Storage on component initialization
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online, codespaces };
  },
  methods: {
    submitLogin() {
      const codespaces = useCodeSpacesStore();
      const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let name = document.querySelector("#name").value;
        let password = document.querySelector("#password").value;
        const formData = { name, password };
        fetch(`${codespaces.csURL}api/user/login`, {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.errMsg) {
              this.loginNote = data.errMsg;
            } else {
              this.loginNote = "Login success";
              console.log(data);
              this.online.loginUser(data);
              if (data.userType == "admin") {
                this.$router.push({
                  name: "Admindata",
                });
              } else if (data.userType == "user") {
                this.$router.push({
                  name: "Main",
                  params: { id: data.name },
                });
              }
            }
          });
      });
    },
  },
};
</script>
