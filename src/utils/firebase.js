import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_qNx_vGl9JzAwwRjpU4XKAlDJxQR7jcM",
  authDomain: "zalo-e4028.firebaseapp.com",
  projectId: "zalo-e4028",
  storageBucket: "zalo-e4028.appspot.com",
  messagingSenderId: "432621677428",
  appId: "1:432621677428:web:dc14ff6aa4e2c5c2fada21",
  measurementId: "G-8KWPYKW9SP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
