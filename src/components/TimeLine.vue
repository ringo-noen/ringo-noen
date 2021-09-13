
<template>
  <div class="main-content-box">
    あ
    <div class="main-content-out-box">
      い
      <div class="main-content-in-box">
  <div class="form__wrapper">
    <div class="text-content">
      <p v-for="tweet in tweets" :key="tweet.id">
        <img v-bind:src="tweet.fileURL" class="tweet_image" />

        <ul class="tweettext">
          <li>
          {{ tweet.username }}
          </li>
        <li>
          {{ tweet.text }}
          </li>
          {{ tweet.place }}
          <li>
          {{ tweet.hashtag }}
          </li>
          <li>
          {{ tweet.datetime }}
          </li>
        </ul>
      </p>
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
      text: "",
      place: "@",
      hashtag: "#",
      tweets: [],
      datetime: "",
      date: "",
      user: "",
      fileURL: "",
    }
  },
  created() {
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

<style scoped>
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
.form__wrapper {
  padding: 1rem;
}
.text-content {
  
  padding-left: 70px;
  margin-bottom: 50px;
   
}

.tweettext {
text-align: center;
padding: 0.5em 1em;
  margin: 2em 0;
  color: #5d627b;
  background: white;
  border-top: solid 5px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);


  
 
}

.tweet_image {
  display: block;
     margin:auto;
     width:25vw;
     height: 25vw;
      border: solid 10px #000000;

     
     


}
</style>
