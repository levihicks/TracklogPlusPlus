import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAa-oEN5i-5hl-6fOHn-iYVY9VPp0LvGhE",
  authDomain: "tracklogplusplus.firebaseapp.com",
  databaseURL: "https://tracklogplusplus.firebaseio.com",
  projectId: "tracklogplusplus",
  storageBucket: "tracklogplusplus.appspot.com",
  messagingSenderId: "468582570506",
  appId: "1:468582570506:web:831da991e3c24a4c0e1df3",
  measurementId: "G-L9681BXYWL",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () => auth.signOut();

export const authObserver = (success, fail) =>
  auth.onAuthStateChanged((authUser) => {
    if (authUser) success(authUser);
    else fail();
  });

export const userLog = (uid) => db.ref(`logs/${uid}`);
export const logAlbum = (uid, album) => db.ref(`logs/${uid}/${album}`);
