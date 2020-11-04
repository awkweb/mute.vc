const firebase = require('firebase')
require('firebase/firestore')

function getDatabase() {
    return !firebase.apps.length
        ? firebase
              .initializeApp({
                  apiKey: process.env.FIREBASE_API_KEY,
                  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                  projectId: process.env.FIREBASE_PROJECT_ID,
              })
              .firestore()
        : firebase.app().firestore()
}

module.exports = getDatabase
