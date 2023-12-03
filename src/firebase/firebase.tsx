import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { AssetsState } from "../features/assets/assetsSlice";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,

  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const FirebaseApp = initializeApp(firebaseConfig);
export const GoogleProvider = new GoogleAuthProvider();

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);

export const fetchUserData = async () => {
  const id = FirebaseAuth.currentUser?.uid;

  try {
    const docs = await getDoc(doc(FirebaseDB, "userData", `${id}`));

    if (!docs.exists() || !id) return;

    return docs.data() as AssetsState;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const saveUserData = async (state: AssetsState) => {
  const id = FirebaseAuth.currentUser?.uid;

  if (!id) return;

  try {
    setDoc(doc(FirebaseDB, "userData", `${id}`), {
      ...state,
      cryptoPrices: [],
      stockPrices: [],
      userID: FirebaseAuth.currentUser?.uid,
    }).then(() => console.log(`${id} Successfully saved...`));
  } catch (err) {
    alert("Unable to save data " + err);
  }
};
