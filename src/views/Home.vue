<template>
  <div class="home">
    <SubmitForm />
    <Search />
  </div>
</template>

<script>
// @ is an alias to /src
import SubmitForm from "@/components/SubmitForm.vue"
import Search from "@/components/Search.vue"

export default {
  name: "Home",
  components: {
    SubmitForm,
    Search,
  },
}
</script>
