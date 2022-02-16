import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAQSkkuu1yo8MgO4m-IkmbY5JFdCeu1VoA",
  authDomain: "case-law-database.firebaseapp.com",
  databaseURL: "https://case-law-database-default-rtdb.firebaseio.com",
  projectId: "case-law-database",
  storageBucket: "case-law-database.appspot.com",
  messagingSenderId: "523926910114",
  appId: "1:523926910114:web:38188ad5cd0c7ac41493fb",
  measurementId: "G-RNCZXPFP98"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
