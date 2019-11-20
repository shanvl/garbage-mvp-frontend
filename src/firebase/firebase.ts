import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAMT7dPaby4nVT8zvGqoEd5QiCqTyW2dQg",
  authDomain: "plastic-82e9e.firebaseapp.com",
  databaseURL: "https://plastic-82e9e.firebaseio.com",
  projectId: "plastic-82e9e",
  storageBucket: "plastic-82e9e.appspot.com",
  messagingSenderId: "434986790177",
};

firebase.initializeApp(config);

const db = firebase.database();

export default db;
