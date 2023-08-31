<template>
  <section>
    <aside>Main page: sidebar<SideBarComp /></aside>
    <div>
      <header>Main page: header <HeaderComp /></header>
      <main>main-part(router-view)<router-view></router-view></main>
    </div>
  </section>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import SideBarComp from "@/components/SideBarComp.vue";

export default {
  name: "MainView",
  components: {
    SideBarComp,
    HeaderComp,
  },
};
</script>

<style scoped>
section {
  display: flex;
  height: 100vh;
}
aside {
  width: 20%;
  background-color: rgb(246, 253, 253);
}
div {
  width: 80%;
}
header {
  background-color: rgb(248, 248, 248);
}
</style>
