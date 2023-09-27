<template>
  <div class="signBox">
    <h2>Sign In</h2>
    <form>
      <div>
        *<input
          type="text"
          id="name"
          name="name"
          placeholder="Username"
          required
        />
      </div>
      <div>
        *<input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" @click="submitLogin">Login</button>
    </form>
    <!-- <GoogleLogin :callback="callback" /> -->
    <p>{{ loginNote }}</p>
    <transition name="registerTransition" appear>
      <div class="transition" v-show="isTransition">
        <div class="transitionHoler">
          <img src="../assets/work-in-progress.png" alt="work-in-progress" />
          <h3>{{ loginNote }}</h3>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
import { useOnlineStore } from "@/store/online";
export default {
  name: "LoginView",
  data() {
    return {
      loginNote: "",
      isTransition: false,
    };
  },
  setup() {
    const callback = (response) => {
      // This callback will be triggered when the user selects or login to
      // his Google account from the popup
      console.log("Handle the response", response);
    };
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();

    // Retrieve data from Local Storage on component initialization
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online, codespaces, callback };
  },
  methods: {
    submitLogin() {
      const codespaces = useCodeSpacesStore();
      const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.isTransition = true;
        setTimeout(() => {
          this.isTransition = false;
        }, 3000);
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
                setTimeout(() => {
                  this.$router.push({
                    name: "Admindata",
                  });
                }, 1500);
              } else if (data.userType == "user") {
                setTimeout(() => {
                  this.$router.push({
                    name: "Main",
                    params: { id: data.name },
                  });
                }, 1500);
              }
            }
          });
      });
    },
  },
};
</script>
