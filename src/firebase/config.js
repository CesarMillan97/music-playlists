import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
   apiKey: "AIzaSyCfl6WcFUWhZI7cU9NFepb2Qu9jtawf6QE",
   authDomain: "music-playlists-fd42e.firebaseapp.com",
   projectId: "music-playlists-fd42e",
   storageBucket: "music-playlists-fd42e.appspot.com",
   messagingSenderId: "915296225879",
   appId: "1:915296225879:web:9ce9de4e752022539f3112"
 };

 //init firebase
 firebase.initializeApp(firebaseConfig)

//  Init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// Timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }