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
          name="passord"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" @click="submitLogin">Login</button>
    </form>
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
                }, 3000);
              } else if (data.userType == "user") {
                setTimeout(() => {
                  this.$router.push({
                    name: "Main",
                    params: { id: data.name },
                  });
                }, 3000);
              }
            }
          });
      });
    },
  },
};
</script>

<style scoped>
.signBox {
  position: relative;
}
.transition {
  background-color: white;
  border-radius: 10px;
  transition: 1s linear;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.transitionHoler {
  margin: auto;
  max-width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: 70%;
  height: auto;
  margin-bottom: 2rem;
}

h3 {
  font-size: 1.5rem;
  text-align: center;
  color: rgb(245, 140, 143);
}

.registerTransition-enter-active {
  animation: atguigu 1s ease;
}

.registerTransition-leave-active {
  animation: atguigu 1s ease-in reverse;
}

@keyframes atguigu {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
