import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { AssetsState } from "../features/assets/assetsSlice";
import CryptoJS from "crypto-js";
import { pregeneratedKey } from "../constants";

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
  const key = FirebaseAuth.currentUser?.uid + pregeneratedKey;

  try {
    const docs = await getDoc(doc(FirebaseDB, "userData", `${id}`));

    if (!docs.exists() || !id) return;

    const bytes = CryptoJS.AES.decrypt(docs.data().encString, key);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decryptedData as AssetsState;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const saveUserData = async (state: AssetsState) => {
  const id = FirebaseAuth.currentUser?.uid;
  const key = FirebaseAuth.currentUser?.uid + pregeneratedKey;

  if (!id) return;

  const obj = {
    ...state,
    cryptoPrices: [],
    stockPrices: [],
  };

  try {
    setDoc(doc(FirebaseDB, "userData", `${id}`), {
      encString: CryptoJS.AES.encrypt(JSON.stringify(obj), key).toString(),
    }).then(() => console.log(`${id} Successfully saved...`));
  } catch (err) {
    alert("Unable to save data " + err);
  }
};
