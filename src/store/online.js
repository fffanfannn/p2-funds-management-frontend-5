import { defineStore } from "pinia";

export const useOnlineStore = defineStore("online", {
  state: () => ({
    users: [],
    detailArray: [],
    loginUserEach: [],
    allUsersList: [],
    test: [],
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    addUser(user) {
      this.users.push(user);
    },

    detailObject(data) {
      this.detailArray = [];
      this.detailArray.push(data);
    },

    loginUser(data) {
      this.loginUserEach = [];
      localStorage.setItem("lastUserInfo", JSON.stringify(data));
      this.loginUserEach.push(data);
    },

    userList(data) {
      this.allUsersList.push(data);
    },

    addTest(data) {
      this.test.push(data);
    },
  },
});
