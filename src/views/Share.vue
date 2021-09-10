<template>
  <div class="Share">
    <h1>This is an Share page</h1>
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="どんなおにぎり？"
    />
    <textarea
      class="form__textarea"
      v-model="place"
      placeholder="どこのおにぎり？"
    />
    <textarea
      class="form__textarea"
      v-model="hashtag"
      placeholder="ハッシュタグを入れてね"
    />
    <input
      type="file"
      accept="image/*"
      ref="preview"
      v-on:change="changeFile"
    />
    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button">SHARE</button>
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
  methods: {
    postTweet() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      this.datetime =
        year + "年" + month + "月" + day + "日" + hour + "時" + minute + "分"
      this.date = year + "年" + month + "月" + day + "日"
      firebase
        .firestore()
        .collection("tweets")
        .add({
          text: this.text,
          hashtag: this.hashtag,
          datetime: this.datetime,
          date: this.date,
          username: this.user.displayName,
          fileURL: this.fileURL,
        })
        .then(() => {
          this.$router.go({ path: this.$router.currentRoute.path, force: true })
        })
    },
    async changeFile(event) {
      let self = this
      let file = event.target.files[0]
      const storageRef = firebase.storage().ref()
      const fileName = file.name
      const ImagesRef = storageRef.child("images/" + fileName)
      await ImagesRef.put(file).then(function () {
        console.log("アップロード成功したよ!")
      })
      ImagesRef.getDownloadURL().then(function (downloadURL) {
        self.fileURL = downloadURL
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
