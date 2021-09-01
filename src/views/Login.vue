<template>
  <div id="app">
    <h1>ログインページ</h1>
    <div v-if="user">ログインしています</div>
    <div v-else>ログインしていません</div>
    <!-- <router-link to="/login"
      ><button @click="logOut">ログアウト</button></router-link
    > -->
    <router-link to="/userprofile"
      ><div @click="googleLogin">Googleログイン</div></router-link
    >
    <router-link to="/userprofile"
      ><div @click="twitterLogin">Twitterログイン</div></router-link
    >
    <router-link to="/userprofile"
      ><div @click="facebookLogin">Facebookログイン</div></router-link
    >
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      // isLogin: false,
      user: null,
    }
  },
  methods: {
    googleLogin() {
      const googleProvider = new firebase.auth.GoogleAuthProvider()
      firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
          console.log(result)
          if (result.user) {
            this.isLogin = true
          }
        })
    },
    twitterLogin() {
      const twitterProvider = new firebase.auth.TwitterAuthProvider()
      firebase
        .auth()
        .signInWithPopup(twitterProvider)
        .then((result) => {
          console.log(result)
          if (result.user) {
            this.isLogin = true
          }
        })
    },
    facebookLogin() {
      const facebookProvider = new firebase.auth.FacebookAuthProvider()
      firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
          console.log(result)
          if (result.user) {
            this.isLogin = true
          }
        })
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLogin = false
        })
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
