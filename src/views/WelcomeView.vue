<template>
  <section class="welcomeHeader">
    <div class="container">
      <div class="headerContent">
        <div class="logo">Transaction Management</div>
        <div>
          <router-link to="Register">Sign up</router-link>
          <router-link to="Login">Sign in</router-link>
        </div>
      </div>
    </div>
  </section>
  <section class="welcomePage">
    <div class="container">
      <div class="pageContent">
        <div class="leftdiv">
          <h1>Transaction Management</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
            esse tenetur mollitia totam consequuntur nulla
          </p>
          <a href="">Join Us</a>
        </div>
        <div class="rightdiv">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>
