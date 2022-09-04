import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, writeBatch, collection, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC7UoEjKmJGsji-76fsu_bk_DGK7iHP5TU",
    authDomain: "crwn-clothing-db-1ffbc.firebaseapp.com",
    projectId: "crwn-clothing-db-1ffbc",
    storageBucket: "crwn-clothing-db-1ffbc.appspot.com",
    messagingSenderId: "385970845013",
    appId: "1:385970845013:web:f8e85d1f02b592dea9ebdc",
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, idProperty) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object[idProperty].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    // const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    //     const {title, items} = docSnapshot.data();
    //     accumulator[title.toLowerCase()] = items;

    //     return accumulator;
    // }, {});

    // return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;

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
                ...additionalInformation,
            });
        } catch (e) {
            console.log("Error creating user ", e.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const sighInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callBack) => {
    if (callBack === undefined || callBack === null) return;

    onAuthStateChanged(auth, callBack)
};