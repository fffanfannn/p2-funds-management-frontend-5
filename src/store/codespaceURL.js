import { defineStore } from "pinia";

export const useCodeSpacesStore = defineStore("codespaces", {
  state: () => ({
    csURL: "http://52.90.39.12:3003/",
  }),
});
