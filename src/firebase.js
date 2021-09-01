import Vue from "vue"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAwSGJ9EReJ3DgAQmWgTGpTohKm-o5A-mM",
  authDomain: "ringo-noen.firebaseapp.com",
  projectId: "ringo-noen",
  storageBucket: "ringo-noen.appspot.com",
  messagingSenderId: "30089329752",
  appId: "1:30089329752:web:41ea6487f88404a9a69e2d",
  measurementId: "G-Y668Q8MJ2E",
}

firebase.initializeApp(firebaseConfig)

const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
}
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
})
firebase.auth().onAuthStateChanged((user) => {
  let state
  if (user) {
    const { uid, displayName, photoURL } = user
    state = {
      uid,
      displayName,
      photoURL,
    }
  } else {
    state = initialUserState
  }
  Object.assign($auth.currentUser, state)
})
Vue.prototype.$auth = $auth
