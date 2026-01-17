import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2x1rjzFR_NiUNFFUnhdz8Zu7V-IJBH7w",
  authDomain: "finanzapro-48760.firebaseapp.com",
  projectId: "finanzapro-48760",
  storageBucket: "finanzapro-48760.firebasestorage.app",
  messagingSenderId: "831695069008",
  appId: "1:831695069008:web:98969b6676ca60ddd25655"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export default app;