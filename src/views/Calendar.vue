<template>
  <div class="calendar-box">
    <h2>{{ displayMonth }}</h2>
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
          <div class="calendar-day">{{ day.day }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  data() {
    return {
      currentDate: moment(),
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
    getCalendar() {
      let startDate = this.getStartDate()
      const endDate = this.getEndDate()
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7)

      let calendars = []
      let calendarDate = this.getStartDate()
      for (let week = 0; week < weekNumber; week++) {
        let weekRow = []
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
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
