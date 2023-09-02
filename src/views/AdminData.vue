<template>
  <header><HeaderComp /></header>
  <section>
    <table>
      <tr>
        <th>User ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Type</th>
        <th>VIP</th>
      </tr>
      <tr v-for="user in online.allUsersList" :key="user._id">
        <td>{{ user._id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.userType }}</td>
        <td>{{ user.isVip ? "Yes" : "No" }}</td>
      </tr>
    </table>
  </section>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import { useOnlineStore } from "@/store/online";
import { useCodeSpacesStore } from "@/store/codespaceURL";

export default {
  name: "AdminData",
  components: {
    HeaderComp,
  },
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online, codespaces };
  },

  created() {
    this.online.users = [];
    const codespaces = useCodeSpacesStore();
    fetch(`${codespaces.csURL}api/user/list`)
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          this.dataNote = "No Users Found";
        } else {
          console.log(data);
          for (let user of data) {
            this.online.userList(user);
          }
        }
      });
  },
};
</script>
