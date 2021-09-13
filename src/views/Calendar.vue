<template>
  <div class="main-content-box">
    <div class="main-content-out-box">
      <div class="main-content-in-box">
        <div class="content-box">
          <div class="calendar-left-box">
            <div class="calendar-box">
              <div class="calendar-title">{{ displayDate }}</div>
              <div class="button-area">
                <button @click="prevMonth">前の月</button>
                <button @click="nextMonth">次の月</button>
              </div>
              <div class="calendar">
                <div class="calendar-weekly">
                  <div class="calendar-youbi" v-for="n in 7" :key="n">
                    {{ youbi(n - 1) }}
                  </div>
                </div>
                <div
                  v-for="(week, index) in calendars"
                  :key="index"
                  class="calendar-weekly"
                >
                  <div
                    v-for="(day, index) in week"
                    :key="index"
                    class="calendar-daily"
                    :class="{ outside: currentMonth !== day.month }"
                  >
                    <div class="calendar-day">
                      <div class="calendar-day-day">{{ day.day }}</div>
                      <br />
                      <div class="calendar-day-count" v-if="day.count > 0">
                        <div class="calendar-day-count-img">
                          <!-- <img src="@/assets/おにぎり2.jpeg" /> -->
                          🍙
                        </div>
                        ×{{ day.count }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="calendar-right-box">
            <div class="calendar-right-top-box">
              <div class="count">
                <div class="count-title">現在のユーザ全体の総投稿数は...</div>
                <!-- <div class="count-text">{{ tweets.length }}</div> -->
                <div class="count-graph">
                  <div v-if="tweets.length < 100">
                    <vue-justgage
                      ref="g1"
                      id="g1"
                      width="30%"
                      class="gauge"
                    ></vue-justgage>
                  </div>
                  <div v-else-if="tweets.length < 200">
                    <vue-justgage
                      ref="g2"
                      id="g2"
                      width="30%"
                      class="gauge"
                    ></vue-justgage>
                  </div>
                  <div v-else-if="tweets.length < 300">
                    <vue-justgage
                      ref="g3"
                      id="g3"
                      width="30%"
                      class="gauge"
                    ></vue-justgage>
                  </div>
                  <div v-else-if="tweets.length < 400">
                    <vue-justgage
                      ref="g4"
                      id="g4"
                      width="30%"
                      class="gauge"
                    ></vue-justgage>
                  </div>
                  <div v-else>
                    <vue-justgage
                      ref="g5"
                      id="g5"
                      width="30%"
                      class="gauge"
                    ></vue-justgage>
                  </div>
                </div>
              </div>
            </div>
            <div class="calendar-right-bottom-box">
              <div class="calendar-right-bottom-left-box">
                <div
                  class="calendar-right-bottom-left-content"
                  v-if="tweets.length < 100"
                >
                  <div class="calendar-right-bottom-left-title">
                    ランク：イラスト富士
                  </div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/富士山イラスト.jpg" />
                  </div>
                </div>
                <div
                  class="calendar-right-bottom-left-content"
                  v-else-if="tweets.length < 200"
                >
                  <div class="calendar-right-bottom-left-title">
                    ランク：富士山
                  </div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/富士山.jpg" />
                  </div>
                </div>
                <div
                  class="calendar-right-bottom-left-content"
                  v-else-if="tweets.length < 300"
                >
                  <div class="calendar-right-bottom-left-title">
                    ランク：エベレスト
                  </div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/エベレスト.jpg" />
                  </div>
                </div>
                <div
                  class="calendar-right-bottom-left-content"
                  v-else-if="tweets.length < 400"
                >
                  <div class="calendar-right-bottom-left-title">ランク：月</div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/月.png" />
                  </div>
                </div>
                <div class="calendar-right-bottom-left-content" v-else>
                  <div class="calendar-right-bottom-left-title">
                    ランク：ブラックホール
                  </div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/ブラックホール.png" />
                  </div>
                </div>
              </div>
              <div class="calendar-right-bottom-right-box">
                <div
                  class="calendar-right-bottom-right-content"
                  v-if="tweets.length < 100"
                >
                  <div class="calendar-right-bottom-right-title">
                    次のランク：富士山
                  </div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/富士山.jpg" />
                  </div>
                </div>
                <div
                  class="calendar-right-bottom-right-content"
                  v-else-if="tweets.length < 200"
                >
                  <div class="calendar-right-bottom-right-title">
                    次のランク：エベレスト
                  </div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/エベレスト.jpg" />
                  </div>
                </div>
                <div
                  class="calendar-right-bottom-right-content"
                  v-else-if="tweets.length < 300"
                >
                  <div class="calendar-right-bottom-right-title">
                    次のランク：月
                  </div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/月.png" />
                  </div>
                </div>
                <div
                  class="calendar-right-bottom-right-content"
                  v-else-if="tweets.length < 400"
                >
                  <div class="calendar-right-bottom-right-title">
                    次のランク：ブラックホール
                  </div>
                  <div class="calendar-right-bottom-img">
                    <img src="@/assets/ブラックホール.png" />
                  </div>
                </div>
                <div class="calendar-right-bottom-left-content" v-else>
                  最高位のランクです
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import firebase from "firebase"
import Vue from "vue"
import vueJustgage from "vue-justgage"
Vue.use(vueJustgage)

export default {
  data() {
    return {
      currentDate: moment(),
      tweets: [],
      calc_date_dict: {},
      dflt1: {
        min: 0,
        max: 100,
        donut: false,
        gaugeWidthScale: 0.6,
        counter: true,
        hideInnerShadow: true,
      },
      dflt2: {
        min: 0,
        max: 200,
        donut: false,
        gaugeWidthScale: 0.6,
        counter: true,
        hideInnerShadow: true,
      },
      dflt3: {
        min: 0,
        max: 300,
        donut: false,
        gaugeWidthScale: 0.6,
        counter: true,
        hideInnerShadow: true,
      },
      dflt4: {
        min: 0,
        max: 400,
        donut: false,
        gaugeWidthScale: 0.6,
        counter: true,
        hideInnerShadow: true,
      },
      dflt5: {
        min: 0,
        max: 1000,
        donut: false,
        gaugeWidthScale: 0.6,
        counter: true,
        hideInnerShadow: true,
      },
    }
  },
  methods: {
    getStartDate() {
      let date = moment(this.currentDate)
      date.startOf("month")
      const youbiNum = date.day()
      return date.subtract(youbiNum, "days")
    },
    getEndDate() {
      let date = moment(this.currentDate)
      date.endOf("month")
      const youbiNum = date.day()
      return date.add(6 - youbiNum, "days")
    },
    getPerDaytweet(startDate, endDate, tweets) {
      let calc_date = startDate
      let calc_date_dict = {}
      let dayNum = endDate.diff(startDate, "days")
      for (let i = 0; i < dayNum; i++) {
        let calc_date_str = calc_date.format("YYYY[年]M[月]D[日]")
        for (let i = 0; i < tweets.length; i++) {
          let tweet = tweets[i]
          if (tweet.date === calc_date_str) {
            if (Object.keys(calc_date_dict).indexOf(calc_date_str) === -1) {
              calc_date_dict[calc_date_str] = 1
            } else {
              calc_date_dict[calc_date_str] += 1
            }
          }
        }
        calc_date.add(1, "days")
      }
      return calc_date_dict
    },
    getCalendar() {
      let startDate = this.getStartDate()
      const endDate = this.getEndDate()
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7)

      let calc_date_dict = this.getPerDaytweet(startDate, endDate, this.tweets)
      let calendars = []
      let calendarDate = this.getStartDate()
      for (let week = 0; week < weekNumber; week++) {
        let weekRow = []
        let count
        for (let day = 0; day < 7; day++) {
          let calendarDateString = calendarDate.format("YYYY[年]M[月]D[日]")
          if (Object.keys(calc_date_dict).indexOf(calendarDateString) === -1) {
            count = 0
          } else {
            count = calc_date_dict[calendarDateString]
          }
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
            count: count, // eslint-disable-line
          })
          calendarDate.add(1, "days")
        }
        calendars.push(weekRow)
      }
      return calendars
    },
    youbi(dayIndex) {
      const week = ["日", "月", "火", "水", "木", "金", "土"]
      return week[dayIndex]
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month")
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month")
    },
  },
  mounted() {
    console.log(this.getCalendar())
  },
  computed: {
    calendars() {
      return this.getCalendar()
    },
    displayDate() {
      return this.currentDate.format("YYYY[年]M[月]")
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM")
    },
    drawCount() {
      let g1 = this.$refs.g1.draw({
        id: "g1",
        value: this.tweets.length,
        title: "総投稿数",
        defaults: this.dflt1,
      })
      let g2 = this.$refs.g2.draw({
        id: "g2",
        value: this.tweets.length,
        title: "総投稿数",
        defaults: this.dflt2,
      })
      let g3 = this.$refs.g3.draw({
        id: "g3",
        value: this.tweets.length,
        title: "総投稿数",
        defaults: this.dflt3,
      })
      let g4 = this.$refs.g4.draw({
        id: "g4",
        value: this.tweets.length,
        title: "総投稿数",
        defaults: this.dflt4,
      })
      let g5 = this.$refs.g5.draw({
        id: "g5",
        value: this.tweets.length,
        title: "総投稿数",
        defaults: this.dflt5,
      })
      return g1, g2, g3, g4, g5
    },
  },
  created() {
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.tweets.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
      .then(() => {
        if (this.tweets.length < 100) {
          let g1 = this.$refs.g1.draw({
            id: "g1",
            value: this.tweets.length,
            title: "総投稿数",
            defaults: this.dflt1,
          })
          console.log(g1)
        } else if (this.tweets.length < 200) {
          let g2 = this.$refs.g2.draw({
            id: "g2",
            value: this.tweets.length,
            title: "総投稿数",
            defaults: this.dflt2,
          })
          console.log(g2)
        } else if (this.tweets.length < 300) {
          let g3 = this.$refs.g3.draw({
            id: "g3",
            value: this.tweets.length,
            title: "総投稿数",
            defaults: this.dflt3,
          })
          console.log(g3)
        } else if (this.tweets.length < 400) {
          let g4 = this.$refs.g4.draw({
            id: "g4",
            value: this.tweets.length,
            title: "総投稿数",
            defaults: this.dflt4,
          })
          console.log(g4)
        } else {
          let g5 = this.$refs.g5.draw({
            id: "g5",
            value: this.tweets.length,
            title: "総投稿数",
            defaults: this.dflt5,
          })
          console.log(g5)
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
.content-box {
  width: 100%;
  height: 100%;
  display: flex;
}
.calendar-left-box {
  width: 35vw;
  height: 100%;
  padding-left: 2vw;
  padding-right: 1vw;
}
.calendar-right-box {
  width: 30vw;
  height: 100%;
  padding-right: 2vw;
}
.calendar-box {
  /* margin: 2em auto; */
  margin-top: 5%;
  padding: 3%;
  width: 80%;
  background-color: white;
}
.button-area {
  display: flex;
  justify-content: space-between;
}
.calendar-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  justify-content: center;
}
.calendar-box button {
  width: 4rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: rgb(170, 241, 136);
  border-radius: 5px;
}
.calendar-box button:hover {
  width: 4rem;
  height: 2rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: rgb(136, 211, 241);
  border-radius: 5px;
}
.calendar {
  /* max-width: 57rem; */
  max-width: 100%;
  /* min-width: 50rem; */
  border-top: 1px solid #e0e0e0;
  font-size: 0.8em;
}
.calendar-youbi {
  flex: 1;
  border-right: 1px solid #e0e0e0;
  margin-right: -1px;
  text-align: center;
  background-color: aquamarine;
  font-size: 1rem;
  font-weight: bold;
}
.calendar-weekly {
  display: flex;
  border-left: 1px solid #e0e0e0;
}
.calendar-daily {
  flex: 1;
  /* min-height: 4rem;
  min-width: 4rem; */
  max-height: 6rem;
  max-width: 6rem;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-right: -1px;
}
.calendar-day {
  text-align: center;
}
.calendar-day-day {
  font-weight: bold;
  font-size: 1rem;
}
.outside {
  background-color: #f7f7f7;
  border-left: 1px solid #e0e0e0;
}
.calendar-right-top-box {
  width: 90%;
  height: 40%;
  background-color: white;
  margin-top: 5%;
  margin-bottom: 5%;
}
/* .count {
  display: inline-block;
  justify-content: center;
} */
.count-title {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 2%;
  text-align: center;
}
.count-text {
  font-size: 3rem;
  font-weight: bold;
  padding: 2%;
  text-align: center;
}
.count-graph {
  padding: 3%;
  /* text-align: center;
  display: flex;
  justify-content: center; */
}
.calendar-right-bottom-box {
  display: block;
  justify-content: space-between;
  width: 100%;
  height: 50%;
}
.calendar-right-bottom-box {
  display: flex;
  justify-content: space-between;
}
.calendar-right-bottom-left-box {
  display: flex;
  justify-content: space-between;
  width: 20vw;
  height: 100%;
}
.calendar-right-bottom-right-box {
  display: block;
  justify-content: space-between;
  width: 20vw;
  height: 100%;
}
.calendar-right-bottom-left-content {
  display: block;
  justify-content: space-between;
  width: 90%;
  height: 80%;
}
.calendar-right-bottom-right-content {
  display: block;
  justify-content: space-between;
  width: 90%;
  height: 80%;
}
.calendar-right-bottom-left-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.calendar-right-bottom-right-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.calendar-right-bottom-left-title {
  font-size: 1rem;
  font-weight: bold;
}
.calendar-right-bottom-right-title {
  font-size: 1rem;
  font-weight: bold;
}
</style>
