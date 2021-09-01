import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import TimeLine from "../views/TimeLine.vue"
import Search from "../views/Search.vue"
import MyPage from "../views/MyPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/timeline",
    name: "TimeLine",
    component: TimeLine,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPage,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
