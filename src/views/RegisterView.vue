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
      isVip: true,
      name: "",
      email: "",
      password: "",
      vipOrNot: false,
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
