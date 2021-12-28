import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXZD_2mDuAILP-fl7XkRJuAuWnPl6Rfw8",
  authDomain: "bto-test-faf05.firebaseapp.com",
  projectId: "bto-test-faf05",
  storageBucket: "bto-test-faf05.appspot.com",
  messagingSenderId: "381887476539",
  appId: "1:381887476539:web:9d150bd3973f13893afd1e",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const googleAuth = firebase.auth;
const storage = firebase.storage();

db.enablePersistence({ experimentalTabSynchronization: true }).catch((err) => {
  console.log("Firebase persistence error" + " " + err.code);
});

const usersCollection = db.collection("users");
const eventsCollection = db.collection("events");

export { auth, db, storage, usersCollection, eventsCollection, googleAuth };
