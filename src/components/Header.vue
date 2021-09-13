<template>
  <div class="page-box">
    <div class="header-content">
      <div class="header-left-content">
        <div v-if="tweets.length < 100">
          <img src="@/assets/富士山イラスト.jpg" />
        </div>
        <div v-else-if="tweets.length < 200">
          <img src="@/assets/富士山.jpg" />
        </div>
        <div v-else-if="tweets.length < 300">
          <img src="@/assets/エベレスト.jpg" />
        </div>
        <div v-else-if="tweets.length < 400">
          <img src="@/assets/月.png" />
        </div>
        <div v-else>
          <img src="@/assets/ブラックホール.png" />
        </div>
      </div>
      <div class="header-right-content">
        <div class="header-right-top-content">
          <div class="site-title">おにぎりハンター</div>
        </div>
        <div class="header-right-bottom-content">
          <div class="header-right-bottom-left-content">
            <div class="main-page-content">
              <router-link to="/">
                <div class="onigiri-link">
                  <img src="@/assets/おにぎり.png" />
                </div>
                <div class="text-link">Home</div>
                <div></div>
              </router-link>
            </div>
            <div class="main-page-content">
              <router-link to="/share">
                <div class="onigiri-link">
                  <img src="@/assets/おにぎり.png" />
                </div>
                <div class="text-link">Post</div>
              </router-link>
            </div>
            <div class="main-page-content">
              <router-link to="/calendar">
                <div class="onigiri-link">
                  <img src="@/assets/おにぎり.png" />
                </div>
                <div class="text-link">Calendar</div></router-link
              >
            </div>
            <div class="main-page-content">
              <router-link to="/searchpage">
                <div class="onigiri-link">
                  <img src="@/assets/おにぎり.png" />
                </div>
                <div class="text-link">Search</div>
              </router-link>
            </div>
          </div>
          <div class="header-right-bottom-right-content">
            <div class="sub-page-content">
              <router-link to="/userprofile"
                ><div class="sub-page">ユーザ情報</div></router-link
              >
            </div>
            <div class="sub-page-content">
              <router-link to="/login">
                <div class="sub-page" v-if="user === null">ログイン</div>
                <div @click="logOut" class="sub-page" v-if="user">
                  ログアウト
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
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
      tweets: [],
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
    firebase
      .firestore()
      .collection("tweets")
      .orderBy("datetime", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.tweets.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
}
</script>

<style>
.header-content {
  width: 100vw;
  height: 35vh;
  display: flex;
}
.header-left-content {
  width: 35%;
  height: 100%;
}
.header-left-content img {
  width: 35vw;
  height: 35vh;
  /* object-fit: cover; */
}
.header-right-content {
  width: 65%;
  height: 100%;
  background-color: rgb(235, 129, 129);
}
.header-right-top-content {
  width: 100%;
  height: 35%;
  text-align: center;
  justify-content: center;
}
.site-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  padding: 2%;
}
.header-right-bottom-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 65%;
}
.main-page-content {
  width: 25%;
  height: 90%;
  justify-content: center;
  align-items: center;
}
.onigiri-link {
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.onigiri-link img {
  width: 7vw;
  height: 6.5vw;
  object-fit: cover;
}
.text-link {
  width: 100%;
  height: 25%;
  text-align: center;
  justify-content: center;
}
.header-right-bottom-left-content {
  display: flex;
  height: 100%;
  width: 70%;
}
.header-right-bottom-left-content a {
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  text-decoration: none;
}
.header-right-bottom-left-content a:hover {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
.header-right-bottom-right-content {
  display: block;
  height: 100%;
  width: 30%;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.header-right-bottom-right-content a {
  font-size: 1.3rem;
  font-weight: bold;
  color: rgb(79, 147, 224);
  text-decoration: none;
}
.header-right-bottom-right-content a:hover {
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
.sub-page-content {
  display: block;
  height: 30%;
  margin-top: 10%;
}
</style>
