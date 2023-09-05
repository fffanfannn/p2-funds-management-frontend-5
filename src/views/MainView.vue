<template>
  <div class="mainPage">
    <header>
      <HeaderComp />
    </header>
    <section class="mainBody">
      <div class="container">
        <div class="mainContent">
          <aside><SideBarComp /></aside>
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
