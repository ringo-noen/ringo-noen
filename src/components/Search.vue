<template>
  <div class="wrap">
    <div class="search">
      <input
        type="text"
        v-model="inputValue"
        class="form-input"
        placeholder="どんなおにぎり？"
      />
      <img src="@/assets/lupe.png" class="form-button" v-on:click="search" />

      <div class="result">
        <div v-for="tweet in result" :key="tweet.text">
          <img v-bind:src="tweet.fileURL" class="tweet_image" />
          {{ tweet.username }}
          {{ tweet.text }}
          {{ tweet.place }}
          {{ tweet.hashtag }}
          {{ tweet.date }}
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
      inputValue: "",
      allData: [],
      result: [],
    }
  },
  methods: {
    search: function () {
      this.result = []
      const searchword = "#" + this.inputValue
      for (let n = 0; n < this.allData.length; n++) {
        if (searchword === this.allData[n].hashtag) {
          this.result.push(this.allData[n])
        }
      }
      this.inputValue = ""
    },
  },
  created() {
    {
      firebase
        .firestore()
        .collection("tweets")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allData.push(doc.data())
          })
        })
    }
  },
}
</script>
<style>
.form-input {
  background-color: red;
}
.tweet_image {
  width: 100px;
  height: 100px;
}
.form-button {
  width: 4vw;
  height: 4vw;
}
</style>
