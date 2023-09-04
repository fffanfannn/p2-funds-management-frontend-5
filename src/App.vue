<template>
  <router-view />
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  .container {
    max-width: 1100px;
    width: 90%;
    margin: 0 auto;
  }
}

.welcomeHeader {
  background-color: rgb(175 228 236);
  .headerContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 100px;

    .logo {
      font-size: 1.3rem;
      letter-spacing: 0.1rem;
    }

    a {
      background-color: white;
      text-decoration: none;
      color: #000;
      margin-left: 20px;
      padding: 12px 30px;
      border-radius: 10px;
      font-size: 1.2rem;
    }
  }
}

.welcomePage {
  padding: 150px 0;
  .pageContent {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .rightdiv {
      height: 500px;
      width: 40%;
    }

    .leftdiv {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      height: 500px;
      width: 50%;

      h1 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
      }

      p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        line-height: 2rem;
      }

      a {
        background-color: rgb(245, 140, 143);
        text-decoration: none;
        color: #000;
        padding: 15px 30px;
        border-radius: 10px;
        letter-spacing: 0.2rem;
        font-size: 1.3rem;
        color: white;
        font-weight: 600;
        cursor: pointer;
      }
    }
  }
}

.signBox {
  margin-top: 5rem;
  padding: 3rem;
  border-radius: 10px;
  background-color: rgb(194, 234, 240);
  h2 {
    margin-bottom: 2rem;
    letter-spacing: 0.2rem;
  }

  p {
    font-size: 1.1rem;
    margin-top: 2rem;
    letter-spacing: 0.1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    input {
      height: 2rem;
      margin-bottom: 1rem;
      border-radius: 5px;
      margin-left: 1rem;
      padding: 0 1rem;
    }

    .checkbox {
      display: flex;
      align-items: start;
      color: rgb(255, 111, 116);
      font-weight: 900;
      letter-spacing: 0.2rem;

      input[type="checkbox"] {
        height: 1.3rem;
        width: 1.3rem;
        margin-right: 1rem;
        margin-left: 1.5rem;
      }
    }

    select {
      height: 2rem;
      margin-bottom: 1rem;
      border-radius: 5px;
      margin-left: 0.7rem;
      padding: 0 1rem;
    }

    option {
      font-size: 1.2rem;
      border-radius: 5px;
    }

    button {
      text-decoration: none;
      background-color: white;
      border: transparent;
      color: #000;
      padding: 15px 30px;
      border-radius: 10px;
      letter-spacing: 0.2rem;
      font-size: 1.1rem;
      color: black;
      font-weight: 600;
      margin-top: 2rem;
      cursor: pointer;
      &:hover {
        background-color: rgb(245, 140, 143);
        color: white;
      }
    }
  }
}

.mainPage {
  header {
    background-color: rgb(175 228 236);
    height: 100px;
  }

  .mainContent {
    display: flex;
    height: calc(100vh - 80px);
    aside {
      width: 20%;
      background-color: rgb(210, 234, 238);
    }
    .userData {
      width: 80%;
    }
  }
}
</style>
