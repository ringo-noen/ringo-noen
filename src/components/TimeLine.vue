
<template>
  <div class="main-content-box">
    
    <div class="main-content-out-box">
      
      <div class="main-content-in-box">
  <div class="form__wrapper">
    <div class="text-content">
      <p v-for="tweet in tweets" :key="tweet.id" class="tweetcontainer" >
        <img v-bind:src="tweet.fileURL" class="tweet_image" />

        <ul class="tweettext">
          <li>
          {{ tweet.username }}
          </li>
          <br>
          <li>
          {{ tweet.text }}
          </li>
          <br>
          <li>
          {{ tweet.place }}
          </li>
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
.tweetcontainer  {
  display:flex;
  justify-content: center;
  width: 100%;
  

}
.form__wrapper {
  padding: 1rem;
}
.text-content {
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 50px;
   
}
ul {
  list-style: none;
}
.tweettext {
 
  margin-right: 6vw;
 align-content: center;
 height: 20vw;
 width: 25vw;

  padding: 0.5em 1.5em;

  color: #5d627b;
  background: white;
  border-top: solid 5px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
}

.tweet_image {
  margin-left: 6vw;
  margin-bottom:3vw;
  /* display: block;  */
  /* width: 25vw; */
  /* height: 25vw; */
  vertical-align: top;
  width: 20vw;
  height: 20vw;
  border: solid 10px white; 
  -o-object-fit: cover;
  object-fit: cover;

}
</style>
