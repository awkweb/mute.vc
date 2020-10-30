import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
})

function getDatabase(): firebase.firestore.Firestore {
    return firebase.firestore()
}

export default getDatabase
