import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
}

function getDatabase(): firebase.firestore.Firestore {
    return !firebase.apps.length
        ? firebase.initializeApp(config).firestore()
        : firebase.app().firestore()
}

export default getDatabase
