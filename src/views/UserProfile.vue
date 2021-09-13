<template>
  <div class="main-content-box">
    <div class="main-content-out-box">
      <div class="main-content-in-box">
        <div class="user-profile-box">
          <div class="user-profile">
            <div class="signed-in-user-profile__photo">
              <img
                :src="
                  user.photoURL
                    ? user.photoURL
                    : 'https://via.placeholder.com/150'
                "
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
.user-profile-box {
  width: 80%;
  margin-left: 10%;
}
.user-profile {
  width: 90%;
  padding: 5%;
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
