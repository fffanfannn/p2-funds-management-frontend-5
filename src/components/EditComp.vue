<template>
  <div>
    <h4>editComp.vue</h4>
    <form action="">
      <input type="date" v-model="date" name="date" />
      <input
        type="text"
        v-model="amount"
        name="amount"
        :placeholder="listData.amount"
      />
      <select id="transactionType" name="type">
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <select id="transactionTag" name="tag">
        <option value="Default">Default</option>
      </select>
      <input
        type="text"
        v-model="remark"
        name="remark"
        :placeholder="listData.remark"
      />
      <button type="submit" @click="submitUpdate">Update</button>
    </form>
    <button>close</button>
    <p>{{ createMsg }}</p>
  </div>
</template>

<script>
import { useCodeSpacesStore } from "@/store/codespaceURL";
import { useOnlineStore } from "@/store/online";
export default {
  name: "EditComp",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }
    return { online, codespaces };
  },
  props: {
    listData: Object,
  },

  data() {
    return {
      date: this.listData.date,
      createMsg: "",
    };
  },
  methods: {
    submitUpdate() {
      this.createMsg = "";
      const codespaces = useCodeSpacesStore();
      const form = document.querySelector("form");
      console.log(form);
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
        };
        console.log(formData, "formData");
        await fetch(
          `${codespaces.csURL}api/account/edit/${this.listData._id}`,
          {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
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

  created() {
    console.log("listDate", this.listData);
  },
};
</script>
