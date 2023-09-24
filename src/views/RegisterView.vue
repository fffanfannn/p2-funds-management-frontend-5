<template>
  <div class="signBox">
    <h2>Sign Up</h2>
    <form>
      <div>
        *<input
          type="text"
          id="name"
          name="name"
          v-model="name"
          placeholder="Username"
          required
        />
      </div>
      <div>
        *<input
          type="email"
          id="email"
          name="email"
          v-model="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        *<input
          type="password"
          id="password"
          name="passord"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>

      <div>
        *
        <select id="usertype" name="usertype" @input="vipBox">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div class="checkbox" v-show="isVip">
        <input
          type="checkbox"
          id="vipuser"
          name="vipuser"
          value="vipUser"
          v-model="vipOrNot"
        />
        VIP
      </div>
      <button type="submit" @click="submitRegister">Sign Up</button>
    </form>
    <p v-if="registerNote">{{ registerNote }}</p>
    <transition name="registerTransition" appear>
      <div class="transition" v-show="isTransition">
        <div class="transitionHoler">
          <img src="../assets/work-in-progress.png" alt="work-in-progress" />
          <h3>{{ registerNote }}</h3>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "RegisterView",
  data() {
    return {
      registerNote: "",
      isVip: true,
      name: "",
      email: "",
      password: "",
      vipOrNot: false,
      isTransition: false,
    };
  },
  methods: {
    vipBox() {
      const usertype = document.querySelector("#usertype").value;
      if (usertype == "admin") {
        this.isVip = false;
      } else {
        this.isVip = true;
      }
    },
    submitRegister() {
      const form = document.querySelector("form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.isTransition = true;
        setTimeout(() => {
          this.isTransition = false;
        }, 3000);
        let userType = document.querySelector("#usertype").value;
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password,
          userType: userType,
          isVip: this.vipOrNot,
        };
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
              this.registerNote = "Register success, please login";
              setTimeout(() => {
                this.$router.push("/login");
              }, 3000);
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
