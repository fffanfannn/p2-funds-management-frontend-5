<template>
  <div class="createAndSearch">
    <h4>Search</h4>

    <input
      type="text"
      v-model="searchInput"
      id="name"
      name="name"
      @input="searchBtn"
      placeholder="Search by remark"
    />

    From:
    <input type="date" v-model="searchFromDate" @input="searchDateBtn" />
    To:
    <input type="date" v-model="searchToDate" @input="searchDateBtn" />

    <table v-if="searchInput || (searchFromDate && searchToDate)">
      <tr>
        <th>Date</th>
        <th>Amount</th>
        <th>Type</th>
        <th>Tag</th>
        <th>Remark</th>
      </tr>
      <tr v-for="user in searchResults" :key="user._id">
        <td>{{ user.date }}</td>
        <td>{{ user.amount }}</td>
        <td>{{ user.type }}</td>
        <td>{{ user.tag }}</td>
        <td>{{ user.remark }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { useOnlineStore } from "@/store/online";
import { useCodeSpacesStore } from "@/store/codespaceURL";
export default {
  name: "SearchComp",
  setup() {
    const online = useOnlineStore();
    const codespaces = useCodeSpacesStore();
    return { online, codespaces };
  },
  props: {
    userData: Object,
  },

  data() {
    return {
      searchInput: "",
      searchFromDate: "",
      searchToDate: "",
      searchResults: [],
    };
  },
  methods: {
    searchBtn() {
      this.searchFromDate = "";
      this.searchToDate = "";
      this.searchResults = [];
      for (let user of this.online.users) {
        let searchRegExp = new RegExp(this.searchInput, "gi");
        if (searchRegExp.test(user.remark)) {
          console.log(user);
          this.searchResults.push(user);
          console.log(this.searchResults);
        }
      }
    },

    searchDateBtn() {
      this.searchInput = "";
      this.searchResults = [];
      for (let user of this.online.users) {
        const userDate = new Date(user.date);
        const fromDate = new Date(this.searchFromDate);
        const toDate = new Date(this.searchToDate);

        if (
          (!this.searchFromDate || userDate >= fromDate) &&
          (!this.searchToDate || userDate <= toDate)
        ) {
          console.log(user);
          this.searchResults.push(user);
        }
      }
    },
  },
};
</script>
