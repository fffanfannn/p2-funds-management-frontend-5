import { defineStore } from "pinia";

export const useOnlineStore = defineStore("online", {
  state: () => ({ users: [], detailArray: [], loginUserEach: [], test: [] }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    addUser(user) {
      this.users.push(user);
    },

    detailObject(data) {
      this.detailArray.push(data);
    },

    loginUser(data) {
      this.loginUserEach = [];
      localStorage.setItem("lastUserInfo", JSON.stringify(data));
      this.loginUserEach.push(data);
    },

    addTest(data) {
      this.test.push(data);
    },
  },
});
