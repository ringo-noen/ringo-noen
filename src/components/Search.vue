<template>
  <div class="main-content-box">
    あ
    <div class="main-content-out-box">
      い
      <div class="main-content-in-box">
        <div class="search">
          <input
            type="text"
            v-model="inputValue"
            class="form-input"
            placeholder="どんなおにぎり？"
          />
          <img
            src="@/assets/lupe.png"
            class="form-button"
            v-on:click="search"
          />

          <div class="result">
            <div v-for="tweet in result" :key="tweet.text">
              <img v-bind:src="tweet.fileURL" class="tweet_image" />

              <ul class="tweettext">
                <li>
                  {{ tweet.username }}
                </li>
                <li>
                  {{ tweet.text }}
                </li>
                {{
                  tweet.place
                }}
                <li>
                  {{ tweet.hashtag }}
                </li>
                <li>
                  {{ tweet.datetime }}
                </li>
              </ul>
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
.form-input {
  display: block;
  margin: auto;
  background-color: #cccccc;
  color: black;
  width: 20vw;
  height: 3vw;
}
.form-input::placeholder {
  color: black;
}
.tweet_image {
  display: block;
  margin: auto;
  width: 25vw;
  height: 25vw;
  border: solid 10px #000000;
}
ul {
  list-style: none;
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
.form-button {
  display: block;
  margin: auto;
  width: 5vw;
  height: 5vw;
}
</style>
