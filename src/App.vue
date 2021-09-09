<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><div>Home |</div></router-link>
      <router-link to="/share"><div>Share |</div></router-link>
      <router-link to="/login"><div>ログイン |</div></router-link>
      <router-link to="/userprofile"><div>ユーザ情報 |</div></router-link>
      <router-link to="/calendar"><div>おにぎりカレンダー |</div></router-link>
      <router-link to="/login"
        ><div @click="logOut">ログアウト</div></router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      user: null,
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut()
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
