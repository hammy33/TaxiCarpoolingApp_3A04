// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWFKRg6TFWTBcztLsoAxTDGL9Zj_CrDss",
  authDomain: "taxicarpool-firebaseauth.firebaseapp.com",
  projectId: "taxicarpool-firebaseauth",
  storageBucket: "taxicarpool-firebaseauth.appspot.com",
  messagingSenderId: "247508799325",
  appId: "1:247508799325:web:c1fe45944b53a7ce4822b4",
  measurementId: "G-DBMG88THEQ"
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
const analytics = getAnalytics(app);
const auth = firebase.auth()

export { auth };