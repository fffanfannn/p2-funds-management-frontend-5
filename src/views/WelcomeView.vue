<template>
  <div>
    <h1>Welcome page</h1>
    <router-link to="Register">Sign up</router-link>
    <router-link to="Login">Log in</router-link>

    <router-view></router-view>
  </div>
</template>

<style>
.echart {
  width: 600px;
  height: 400px;
  border: 1px solid #ccc;
}
</style>
