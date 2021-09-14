import Vue from "vue"
import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCXX3_JgUt4gDsNLD4fxUVcCoH14aA0ojA",
  authDomain: "onigiri-hunter-15483.firebaseapp.com",
  projectId: "onigiri-hunter-15483",
  storageBucket: "onigiri-hunter-15483.appspot.com",
  messagingSenderId: "264220307711",
  appId: "1:264220307711:web:e7fe74825af00543721cca",
  measurementId: "G-P4MZCSG3GW",
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
