<template>
  <div class="main-content-box">
    <div class="main-content-out-box">
      <div class="main-content-in-box">
        <div class="share-box">
          <div class="input-box">
            <div class="input-box-content">
              <div class="input-title">写真を選択</div>
              <div class="input-content-box">
                <input
                  type="file"
                  accept="image/*"
                  ref="preview"
                  v-on:change="changeFile"
                />
              </div>
            </div>
            <div class="input-box-content">
              <div class="input-title">どんなおにぎり？</div>
              <div class="input-content-box">
                <textarea
                  class="form__textarea"
                  v-model="text"
                  placeholder="どんなおにぎり？"
                />
              </div>
            </div>
            <div class="input-box-content">
              <div class="input-title">どこのおにぎり？</div>
              <div class="input-content-box">
                <textarea
                  class="form__textarea"
                  v-model="place"
                  placeholder="どこのおにぎり？"
                />
              </div>
            </div>
            <div class="input-box-content">
              <div class="input-title">ハッシュタグ</div>
              <div class="input-content-box">
                <textarea
                  class="form__textarea"
                  v-model="hashtag"
                  placeholder="ハッシュタグを入れてね"
                />
              </div>
            </div>
            <div class="input-box-content">
              <div class="form__buttons">
                <button v-on:click="postTweet" class="form__submit-button">
                  投稿
                </button>
              </div>
            </div>
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
  methods: {
    postTweet() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      this.datetime =
        this.zeroPadding(year, 4) +
        "年" +
        this.zeroPadding(month, 2) +
        "月" +
        this.zeroPadding(day, 2) +
        "日 " +
        this.zeroPadding(hour, 2) +
        ":" +
        this.zeroPadding(minute, 2)
      this.date = year + "年" + month + "月" + day + "日"
      firebase
        .firestore()
        .collection("tweets")
        .add({
          text: this.text,
          hashtag: this.hashtag,
          place: this.place,
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
    zeroPadding: function (num, len) {
      let zero = ""
      for (var i = 0; i < len; i++) {
        zero += "0"
      }
      return (zero + num).slice(-len)
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
.share-box {
  width: 70vw;
  height: 100%;
}
.input-box {
  width: 60vw;
  height: 98%;
  padding-top: 2%;
  padding-left: 5vw;
}
.input-box-content {
  padding-bottom: 2vh;
}
.input-title {
  padding-bottom: 0.5vh;
  font-size: 1rem;
}
.form__wrapper {
  padding: 1rem;
}
.form__textarea {
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 1rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
  font-size: 2rem;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: center;
}
.form__buttons button {
  width: 10vw;
  height: 5vh;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: rgb(31, 34, 202);
  border-radius: 5px;
}
.form__buttons button:hover {
  width: 10vw;
  height: 5vh;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: rgb(19, 243, 49);
  border-radius: 5px;
}
</style>
