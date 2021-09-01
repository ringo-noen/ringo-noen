<template>
  <div class="home">
    <SubmitForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SubmitForm from "@/components/SubmitForm.vue"

export default {
  name: "Home",
  components: {
    SubmitForm,
  },
}
</script>
