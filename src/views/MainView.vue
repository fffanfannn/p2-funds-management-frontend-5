<template>
  <div class="mainPage">
    <header>
      <div class="container"><HeaderComp /></div>
    </header>
    <section class="mainBody">
      <div class="container">
        <div class="mainContent">
          <aside>Main page: sidebar<SideBarComp /></aside>
          <div class="userData"><router-view></router-view></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderComp from "@/components/HeaderComp.vue";
import SideBarComp from "@/components/SideBarComp.vue";

export default {
  name: "MainView",
  components: {
    SideBarComp,
    HeaderComp,
    // UserData,
  },
};
</script>

<!-- <style scoped>
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
</style> -->
