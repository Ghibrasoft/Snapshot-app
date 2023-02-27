import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcHvWBdlB-J2_LPNbm5b54vb91gliuDT0",
  authDomain: "snapshot-app-5f31b.firebaseapp.com",
  projectId: "snapshot-app-5f31b",
  storageBucket: "snapshot-app-5f31b.appspot.com",
  messagingSenderId: "404186388357",
  appId: "1:404186388357:web:bddb0612ce0c4b9f73d6ec",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
