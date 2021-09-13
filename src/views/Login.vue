<template>
  <div class="main-content-box">
    <div class="main-content-out-box">
      <div class="main-content-in-box">
        <div id="login">
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
      </div>
    </div>
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

<style>
.main-content-box {
  width: 100vw;
  height: 100%;
  min-height: 65vh;
  /* width: 10vw;
  height: 65vh; */
  background-image: url("~@/assets/赤玉模様.png");
  background-repeat: repeat;
  background-size: 20%;
  /* background-color: red; */
  /* background-size: cover; */
}
.main-content-out-box {
  width: 80vw;
  height: 100%;
  min-height: 65vh;
  margin-left: 10vw;
  background-color: black;
}
.main-content-in-box {
  width: 70vw;
  height: 100%;
  min-height: 65vh;
  margin-left: 5vw;
  background-color: rgb(112, 190, 160);
}
</style>
