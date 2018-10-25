import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBFZudIog3BKfB-wYN_H2wsDQiCBbAxryM",
    authDomain: "coderslab-d2c79.firebaseapp.com",
    databaseURL: "https://coderslab-d2c79.firebaseio.com",
    projectId: "coderslab-d2c79",
    storageBucket: "coderslab-d2c79.appspot.com",
    messagingSenderId: "922208703368"
  };
firebase.initializeApp(config);

const fire = firebase.firestore();
fire.settings({ timestampsInSnapshots: true })

export const db = fire;