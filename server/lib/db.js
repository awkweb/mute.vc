const firebase = require('firebase')
require('firebase/firestore') // Required for side-effects

firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
})

const db = firebase.firestore()

module.exports = db
