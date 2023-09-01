<template>
  <div>
    <h4>createComp.vue</h4>
    <form action="">
      <input type="date" v-model="date" name="date" placeholder="Date" />
      <input type="text" v-model="amount" name="amount" placeholder="Amount" />
      <input type="text" v-model="remark" name="remark" placeholder="Remark" />
      <button type="submit" @click="submitCreate">Create</button>
    </form>
    <button>close</button>
    <p>{{ createMsg }}</p>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
import { useOnlineStore } from "@/store/online";
export default {
  name: "CreateComp",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online, codespaces };
  },
  data() {
    return {
      name: "",
      age: "",
      createMsg: "",
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
        if (!Number(this.amount)) {
          this.createMsg = "Amount must be a number";
          return;
        }
        const formData = {
          date: this.date,
          amount: Number(this.amount),
          tag: "default",
          remark: this.remark,
          userid: this.online.loginUserEach[0]._id,
        };
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
