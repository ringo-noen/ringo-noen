<template>
  <div class="home">
    <TimeLine />
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLine from "@/components/TimeLine.vue"

export default {
  name: "Home",
  components: {
    TimeLine,
  },
}
</script>
