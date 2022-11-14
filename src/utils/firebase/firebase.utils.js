
import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from  'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDS_EL10bSFFBt-i-Rwhlmzv2ms8l7byqQ",
    authDomain: "crown-clothing-db-d17c1.firebaseapp.com",
    projectId: "crown-clothing-db-d17c1",
    storageBucket: "crown-clothing-db-d17c1.appspot.com",
    messagingSenderId: "1029610767554",
    appId: "1:1029610767554:web:92dfd30edcf9a4793ae75b"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {})=> {
    if(!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)
  

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName, email, createdAt
        })
      }
      catch(error){
        console.log("error creating the user", error.message)
      }
    }
    return userDocRef;
  }

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email||!password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email||!password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

// export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback, errorCallback , completedCallback)