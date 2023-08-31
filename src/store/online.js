import { defineStore } from "pinia";

export const useOnlineStore = defineStore("online", {
  state: () => ({ users: [], detailArray: [] }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    addUser(user) {
      this.user = [];
      this.users.push(user);
    },

    detailObject(data) {
      this.detailArray = [];
      this.detailArray.push(data);
    },
  },
});
