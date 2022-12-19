import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAltG_3TYHeCaLB64lCufNomMkWiTWqchE",
  authDomain: "sophis-mart-bd96f.firebaseapp.com",
  projectId: "sophis-mart-bd96f",
  storageBucket: "sophis-mart-bd96f.appspot.com",
  messagingSenderId: "226186888502",
  appId: "1:226186888502:web:23b325b4ad9eb898401f97",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
