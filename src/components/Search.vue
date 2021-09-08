<template>
  <div>
    <input type="text" v-model="inputValue" />
    <button v-on:click="search">検索</button>
    <div id="result">
      <div v-for="tweet in result" :key="tweet.text">
        {{ tweet.username }}
        {{ tweet.text }}
        {{ tweet.hashtag }}
        {{ tweet.date }}
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
