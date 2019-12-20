const firebase = require('firebase')
require('firebase/firestore') // Required for side-effects

// Set up Firebase
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
})

const db = firebase.firestore()

const users = {
    async upsert(userId, data) {
        await db
            .collection('users')
            .doc(userId)
            .set(data, { merge: true })
    },
}

const investors = {
    async upsert(userId, data) {
        await db
            .collection('investors')
            .doc(`${userId}`)
            .set(data, { merge: true })
    },
    async getAll(username = '') {
        const response = await db.collection('investors').get()
        let data = []
        response.forEach((d) => data.push(d.data()))
        data = data.filter((d) => d.screen_name !== username)
        return data
    },
}

module.exports = {
    users,
    investors,
}
