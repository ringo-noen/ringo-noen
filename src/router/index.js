import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Login from "../views/Login.vue"
import UserProfile from "../views/UserProfile.vue"
import Calendar from "../views/Calendar.vue"
import firebase from "firebase"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/userprofile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

const isSignedIn = async () => {
  // Promise を使って、onAuthStateChanged が完了するまで待つ
  return await new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          unsubscribe()
          resolve(true)
        } else {
          unsubscribe()
          resolve(false)
        }
      },
      (error) => {
        unsubscribe()
        reject(error)
      }
    )
  })
}

// Vue Router のグローバルガードで、ログインしてない場合は、BeforeSignInにしか行けなくする。

router.beforeEach(async (to, from, next) => {
  const auth = await isSignedIn()
  if (to.name !== "Login" && !auth) {
    next("/Login")
  } else {
    next()
  }
})

export default router
