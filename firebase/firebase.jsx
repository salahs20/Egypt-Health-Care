import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // استيراد Firebase Storage

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDkXNNrgMS0-2RnRu4b-G-9GUBG8d05fMM",
  authDomain: "graduation-project-ee2b2.firebaseapp.com",
  databaseURL: "https://graduation-project-ee2b2-default-rtdb.firebaseio.com",
  projectId: "graduation-project-ee2b2",
  storageBucket: "graduation-project-ee2b2.appspot.com", // تصحيح storageBucket
  messagingSenderId: "473108820061",
  appId: "1:473108820061:web:7d8f967a418226c1279db4",
  measurementId: "G-SE80Y67GK8",
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // تهيئة Firebase Storage

export { db, storage };
export default app;
