const firebase = require('firebase')
require('firebase/firestore') // Required for side-effects

// Set up Firebase
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
})

const db = firebase.firestore()
const ref = {
    users: db.collection('users'),
}

const users = {
    async upsert(username, data) {
        await ref.users.doc(username).set(data, { merge: true })
    },
}

module.exports = {
    users,
}
