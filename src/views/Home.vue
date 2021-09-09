<template>
  <div class="home">
    <TimeLine />
    <Search />
  </div>
</template>

<script>
// @ is an alias to /src
import TimeLine from "@/components/TimeLine.vue"
import Search from "@/components/Search.vue"

export default {
  name: "Home",
  components: {
    TimeLine,
    Search,
  },
}
</script>
