<template>
  <div class="userDataList">
    <div>
      <div class="titleAndButton">
        <h2>My Transaction List</h2>
        <div>
          <button @click="addBtn">Create</button>
          <button @click="searchBtn">Search</button>
        </div>
      </div>
      <table>
        <tr>
          <th>
            Date
            <span @click="sortByDate">↕</span>
          </th>
          <th>
            Amount
            <span @click="sortByAmount">↕</span>
          </th>
          <th>Type</th>
          <th>Tag</th>
          <th>Remark</th>
          <th>Update</th>
          <th>Delete</th>
          <th>Detail</th>
        </tr>
        <tr
          v-for="user in online.users"
          :key="user.id"
          :class="{
            styleGreen: user.type === 'Income',
            styleRed: user.type !== 'Income',
          }"
        >
          <td>{{ user.date }}</td>
          <td>{{ user.amount }}</td>
          <td>{{ user.type }}</td>
          <td>{{ user.tag }}</td>
          <td>{{ user.remark }}</td>
          <td><button :id="user._id" @click="editBtn(user)">update</button></td>
          <td><button :id="user._id" @click="submitDelete">delete</button></td>
          <td>
            <button :id="user._id" @click="submitDetailLink">details</button>
          </td>
        </tr>
      </table>

      <h3>My Balance: {{ totalAmount }}</h3>
      <p>{{ dataNote }}</p>

      <CreateComp v-if="createDialog"></CreateComp>
      <EditComp v-if="editDialog" :listData="listData"></EditComp>
      <SearchComp v-show="searchDialog"></SearchComp>
    </div>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";
import { useCodeSpacesStore } from "@/store/codespaceURL";
import CreateComp from "@/components/CreateComp.vue";
import EditComp from "@/components/EditComp.vue";
import SearchComp from "@/components/SearchComp.vue";

export default {
  name: "UserData",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    const lastUserInfo = JSON.parse(localStorage.getItem("lastUserInfo"));
    if (lastUserInfo) {
      online.loginUser(lastUserInfo);
    }

    const fetchData = async () => {
      online.customizeTags = [];
      try {
        const response = await fetch(
          `${codespaces.csURL}api/user/tags/${online.loginUserEach[0]._id}`
        );

        const data = await response.json();
        console.log("gettagdata", data);
        if (data[0].myTags2) {
          console.log("gettagdatamyTags1", data[0].myTags2);

          for (let tagName of data[0].myTags2) {
            online.customizeTag(tagName);
          }
        } else {
          console.log("no tag customized");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
    return { online, codespaces };
  },

  data() {
    return {
      createDialog: false,
      editDialog: false,
      detailsDialog: false,
      searchDialog: false,
      dataNote: "",
      sortDataSwitch: true,
      sortAmountSwitch: true,
      detailResults: {},
    };
  },

  components: {
    CreateComp,
    EditComp,
    SearchComp,
  },

  methods: {
    searchBtn() {
      this.searchDialog = !this.searchDialog;
    },
    addBtn() {
      this.createDialog = !this.createDialog;
    },

    editBtn(user) {
      this.editDialog = !this.editDialog;
      this.listData = user;
    },

    async submitDelete(e) {
      console.log(e.target.id);
      const codespaces = useCodeSpacesStore();
      await fetch(`${codespaces.csURL}api/account/delete/${e.target.id}`, {
        method: "delete",
      })
        .then((res) => {
          console.log(res);
          // return res.text();
        })
        .then((data) => {
          console.log(data);
        });

      // this.$router.push({ name: "UserData" });
      location.reload();
    },

    async submitDetailLink(e) {
      console.log(e.target.id);
      const codespaces = useCodeSpacesStore();
      await fetch(`${codespaces.csURL}api/account/${e.target.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("detail() data:", data, typeof data);
          this.online.detailObject(data);
        });

      this.$router.push({
        name: "ItemDetails",
        params: { itemid: e.target.id },
      });
    },

    sortByDate() {
      this.sortDataSwitch = !this.sortDataSwitch;
      if (this.sortDataSwitch) {
        this.online.users.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      } else {
        this.online.users.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      }
    },

    sortByAmount() {
      this.sortAmountSwitch = !this.sortAmountSwitch;
      if (this.sortAmountSwitch) {
        this.online.users.sort((a, b) => {
          return a.amount - b.amount;
        });
      } else {
        this.online.users.sort((a, b) => {
          return b.amount - a.amount;
        });
      }
    },
  },

  computed: {
    totalAmount() {
      let totalAmount = this.incomeTotalAmount - this.expenseTotalAmount;
      return Math.round(totalAmount * 100) / 100;
    },

    incomeTotalAmount() {
      let incomeArray = this.online.users.filter(
        (user) => user.type == "Income"
      );
      let incomeAmount = incomeArray.reduce(
        (total, user) => total + user.amount,
        0
      );
      return Math.round(incomeAmount * 100) / 100;
    },

    expenseTotalAmount() {
      let expenseArray = this.online.users.filter(
        (user) => user.type == "Expense"
      );
      let expenseAmount = expenseArray.reduce(
        (total, user) => total + user.amount,
        0
      );
      return Math.round(expenseAmount * 100) / 100;
    },
  },

  created() {
    this.online.users = [];
    const codespaces = useCodeSpacesStore();
    fetch(
      `${codespaces.csURL}api/account/user/${this.online.loginUserEach[0]._id}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg) {
          this.dataNote = "Please create new data";
        } else {
          console.log(data);
          for (let user of data) {
            this.online.addUser(user);
          }
        }
      });
  },
};
</script>
