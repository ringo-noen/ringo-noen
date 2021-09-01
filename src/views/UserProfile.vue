<template>
  <div user-profile>
    <h1>ユーザ詳細</h1>
    <div class="signed-in-user-profile__photo">
      <img
        :src="user.photoURL ? user.photoURL : 'https://via.placeholder.com/150'"
      />
    </div>
    <div class="signed-in-user-profile" v-if="user">
      <table class="">
        <tr>
          <td>名前</td>
          <td>{{ user.displayName }}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{{ user.uid }}</td>
        </tr>
        <tr>
          <td>email</td>
          <td>{{ user.email }}</td>
        </tr>
      </table>
    </div>
    <div v-else>No User Signed In</div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      user: null,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
}
</script>

<style scoped>
.user-profile {
  width: 90%;
  margin: 0 auto;
}
.signed-in-user-profile__photo {
  text-align: center;
  align-items: center;
  padding-bottom: 2%;
}
.signed-in-user-profile {
  text-align: center;
  align-items: center;
}
table {
  text-align: center;
  align-items: center;
  margin: 0 auto;
}
</style>
