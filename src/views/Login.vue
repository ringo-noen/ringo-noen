<template>
  <div class="main-content-box">
    <div class="main-content-out-box">
      <div class="main-content-in-box">
        <div id="login">
          <div class="isLogin-box">
            <div v-if="user">ログインしています</div>
            <div v-else>ログインしてください</div>
          </div>
          <div class="login-box">
            <div class="google-login-box" @click="googleLogin">
              <img src="@/assets/GoogleLogin.png" />
            </div>
            <div class="twitter-login-box" @click="twitterLogin">
              <img src="@/assets/TwitterLogin.png" />
            </div>
            <div class="facebook-login-box" @click="facebookLogin">
              <img src="@/assets/FacebookLogin.png" />
            </div>
            <!-- <router-link to="/userprofile"
              ><div @click="googleLogin">Googleログイン</div></router-link
            >
            <router-link to="/userprofile"
              ><div @click="twitterLogin">Twitterログイン</div></router-link
            >
            <router-link to="/userprofile"
              ><div @click="facebookLogin">Facebookログイン</div></router-link
            > -->
            <router-view />
          </div>
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
.isLogin-box {
  font-size: 3rem;
  justify-content: center;
  text-align: center;
  padding: 3%;
}
.google-login-box {
  width: 40%;
  height: 10%;
  margin-left: 30%;
  margin-bottom: 2%;
}
.google-login-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.twitter-login-box {
  width: 40%;
  height: 10%;
  margin-left: 30%;
  margin-bottom: 2%;
}
.twitter-login-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.facebook-login-box {
  width: 40%;
  height: 10%;
  margin-left: 30%;
  margin-bottom: 2%;
}
.facebook-login-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
