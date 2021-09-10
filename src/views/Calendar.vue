<template>
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
          <div class="count-graph" v-if="tweets.length <= 100">
            <vue-justgage
              ref="g1"
              id="g1"
              width="50%"
              class="gauge"
            ></vue-justgage>
          </div>
          <div class="count-graph" v-else>
            <vue-justgage
              ref="g2"
              id="g2"
              width="50%"
              class="gauge"
            ></vue-justgage>
          </div>
        </div>
      </div>
      <div class="calendar-right-bottom-box">
        <div class="calendar-right-bottom-left-box">
          <div class="calendar-right-bottom-left-content">
            <div class="calendar-right-bottom-left-title">
              現在のランクは...
            </div>
            <div class="calendar-right-bottom-img">
              <img src="@/assets/富士山イラスト.jpg" />
            </div>
          </div>
        </div>
        <div class="calendar-right-bottom-right-box">
          <div class="calendar-right-bottom-right-content">
            <div class="calendar-right-bottom-right-title">次のランクは...</div>
            <div class="calendar-right-bottom-img">
              <img src="@/assets/富士山.jpg" />
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
        var g1 = this.$refs.g1.draw({
          id: "g1",
          value: this.tweets.length,
          title: "総投稿数",
          defaults: this.dflt1,
        })
        console.log(g1)
      })
      .then(() => {
        var g2 = this.$refs.g2.draw({
          id: "g2",
          value: this.tweets.length,
          title: "総投稿数",
          defaults: this.dflt2,
        })
        console.log(g2)
      })
  },
}
</script>

<style>
.content-box {
  display: flex;
}
.calendar-left-box {
  width: 55vw;
  height: 70vh;
  padding-left: 5rem;
}
.calendar-right-box {
  width: 30vw;
  height: 70vh;
  padding-right: 5vw;
}
.calendar-box {
  /* margin: 2em auto; */
  padding: 3%;
  width: 80%;
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
  width: 6rem;
  height: 3rem;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: rgb(170, 241, 136);
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
  min-height: 6rem;
  min-width: 6rem;
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
  width: 100%;
  height: 40vh;
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
  font-size: 1.3rem;
  font-weight: bold;
}
.calendar-right-bottom-right-title {
  font-size: 1.3rem;
  font-weight: bold;
}
.count-title {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 3rem;
  text-align: center;
}
.count-graph {
  padding: 3%;
}
</style>
