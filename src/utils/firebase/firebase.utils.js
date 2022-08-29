import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC7UoEjKmJGsji-76fsu_bk_DGK7iHP5TU",
    authDomain: "crwn-clothing-db-1ffbc.firebaseapp.com",
    projectId: "crwn-clothing-db-1ffbc",
    storageBucket: "crwn-clothing-db-1ffbc.appspot.com",
    messagingSenderId: "385970845013",
    appId: "1:385970845013:web:f8e85d1f02b592dea9ebdc",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (e) {
            console.log('Error creating user ', e.message);
        }
    }
};
