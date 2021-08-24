import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCW67O6zNFvr5fOm_hHIWbZrM0Mw6Qtbco",
    authDomain: "art-rent.firebaseapp.com",
    projectId: "art-rent",
    storageBucket: "art-rent.appspot.com",
    messagingSenderId: "589943632591",
    appId: "1:589943632591:web:02fc71353d899348337dba"
});

export const auth = app.auth()
export const db = app.firestore()
export const projectStorage = app.storage()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export default app


