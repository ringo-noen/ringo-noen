<template>
  <div class="form__wrapper">
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.username }}
        <img v-bind:src="tweet.fileURL" class="tweet_image" />
        {{ tweet.text }}
        {{ tweet.place }}
        {{ tweet.hashtag }}
        {{ tweet.datetime }}
      </p>
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
.form__wrapper {
  padding: 1rem;
}
.form__textarea {
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: flex-end;
}
.tweet_image {
  width: 100px;
  height: 100px;
}
</style>
