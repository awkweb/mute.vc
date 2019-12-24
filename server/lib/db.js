const firebase = require('firebase')
require('firebase/firestore') // Required for side-effects

// Set up Firebase
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
})

const db = firebase.firestore()
const NUM_SHARDS = 3

const counter = {
    create(username) {
        const ref = db.collection('investors').doc(username)
        const batch = db.batch()

        // Initialize the counter document
        batch.set(ref, { num_shards: NUM_SHARDS }, { merge: true })

        // Initialize each shard with count=0
        for (let i = 0; i < NUM_SHARDS; i++) {
            const shardRef = ref.collection('shards').doc(i.toString())
            batch.set(shardRef, { count: 0 })
        }

        // Commit the write batch
        return batch.commit()
    },
    async count(username) {
        const ref = db.collection('investors').doc(username)
        // Sum the count of each shard in the subcollection
        const doc = await ref.collection('shards').get()
        let count = 0
        doc.forEach((doc) => (count += doc.data().count))
        return count
    },
    increment(username) {
        const ref = db.collection('investors').doc(username)
        // Select a shard of the counter at random
        const shardId = Math.floor(Math.random() * NUM_SHARDS).toString()
        const shardRef = ref.collection('shards').doc(shardId)

        // Update count
        return shardRef.update(
            'count',
            firebase.firestore.FieldValue.increment(1),
        )
    },
}

const users = {
    async upsert(username, data) {
        await db
            .collection('users')
            .doc(username)
            .set(data, { merge: true })
    },
}

const investors = {
    incrementMutes(usernames) {
        usernames.forEach((username) => counter.increment(username))
    },
    async getAll(username = '') {
        const docs = await db.collection('investors').get()

        const promises = []
        const data = []
        docs.forEach((doc) => {
            const d = doc.data()
            const { screen_name: u } = d
            promises.push(counter.count(u))
            data.push(d)
        })

        const all = await Promise.all(promises)
        let enriched = []
        all.forEach((value, index) => {
            const doc = data[index]
            enriched.push({
                ...doc,
                mutes: value,
            })
        })
        enriched = enriched.filter((d) => d.screen_name !== username)

        return enriched
    },
    async upsert(username, data) {
        const ref = db.collection('investors').doc(username)
        await ref.set(data, { merge: true })
        const doc = await ref.get()
        if (doc.exists) {
            const { num_shards: hasMuteCounter } = doc.data()
            if (!hasMuteCounter) {
                counter.create(username)
            }
        }
    },
}

module.exports = {
    counter,
    investors,
    users,
}
