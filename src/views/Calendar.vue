<template>
  <div class="content-box">
    <div class="count">
      <div v-if="tweets.length <= 100">
        <vue-justgage ref="g1" id="g1" class="gauge"></vue-justgage>
      </div>
      <div v-else>
        <vue-justgage ref="g2" id="g2" class="gauge"></vue-justgage>
      </div>
    </div>
    <div class="calendar-box">
      <h2>{{ displayDate }}</h2>
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
              {{ day.day }}<br />
              投稿数：{{ day.count }}<br />
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
.calendar-box {
  margin: 2em auto;
  width: 900px;
}
.button-area {
  margin: 0.5em 0;
}
.button {
  padding: 4px 8px;
  margin-right: 8px;
}
.calendar {
  max-width: 900px;
  border-top: 1px solid #e0e0e0;
  font-size: 0.8em;
}
.calendar-youbi {
  flex: 1;
  border-right: 1px solid #e0e0e0;
  margin-right: -1px;
  text-align: center;
}
.calendar-weekly {
  display: flex;
  border-left: 1px solid #e0e0e0;
}
.calendar-daily {
  flex: 1;
  min-height: 125px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-right: -1px;
}
.calendar-day {
  text-align: center;
}
.outside {
  background-color: #f7f7f7;
  border-left: 1px solid #e0e0e0;
}
</style>
