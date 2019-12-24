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
    investors: db.collection('investors'),
    users: db.collection('users'),
}

const users = {
    async upsert(username, data) {
        await ref.users.doc(username).set(data, { merge: true })
    },
}

const investors = {
    incrementMutes(usernames) {
        usernames.forEach((username) => {
            ref.investors
                .doc(username)
                .update('mutes', firebase.firestore.FieldValue.increment(1))
        })
    },
    async list(username = '') {
        const docs = await ref.investors.get()
        const data = []
        docs.forEach((doc) => {
            const d = doc.data()
            if (d.username !== username) {
                data.push(d)
            }
        })
        return data
    },
    async upsert(username, data) {
        await ref.investors.doc(username).set(data, { merge: true })
    },
}

module.exports = {
    investors,
    users,
}
