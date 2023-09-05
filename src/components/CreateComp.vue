<template>
  <div class="createAndSearch">
    <h4>Create transaction</h4>
    <form action="">
      <input type="date" v-model="date" name="date" placeholder="Date" />
      <input type="text" v-model="amount" name="amount" placeholder="Amount" />
      <select id="transactionType" name="type">
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <select id="transactionTag" name="tag">
        <option value="Default">Default</option>
        <option
          v-for="(tag, index) in online.customizeTags"
          :key="index"
          :value="tag"
        >
          {{ tag }}
        </option>
      </select>
      <input type="text" v-model="remark" name="remark" placeholder="Remark" />
      <button type="submit" @click="submitCreate">Create</button>
    </form>
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
      date: "",
      amount: "",
      remark: "",
    };
  },
  methods: {
    submitCreate() {
      this.createMsg = "";
      const codespaces = useCodeSpacesStore();
      const form = document.querySelector("form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!Number(this.amount)) {
          this.createMsg = "Amount must be a number";
          return;
        }
        const selectedType = document.querySelector("#transactionType").value;
        const selectedTag = document.querySelector("#transactionTag").value;
        const formData = {
          date: this.date,
          amount: Number(this.amount),
          type: selectedType,
          tag: selectedTag,
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
