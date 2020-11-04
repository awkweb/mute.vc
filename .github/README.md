## Dev

```
yarn global add vercel
vercel env pull
```
## Prod

Set [Environment Variables](https://zeit.co/zoo/mute-vc/settings/environment-variables):

```
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=mutevc.firebaseapp.com
FIREBASE_PROJECT_ID=mutevc
SECRET=xxx
TWITTER_KEY=xxx
TWITTER_LIST_OWNER=awkweb
TWITTER_LIST_SLUG=investors
TWITTER_SECRET=xxx
URL=https://mute.vc
```

<details>
<summary>How to fill in secret values</summary>
<p>

<h4>Twitter</h4>

Create a [new Twitter app](https://developer.twitter.com) and add the following callback urls:

```
http://localhost:3000/api/auth/callback
https://mute-vc.now.sh/api/auth/callback
https://mute-vc.vercel.app/api/auth/callback
https://mute.vc/api/auth/callback
```

Add your consumer `API key` to `TWITTER_KEY` and `API secret key` to `TWITTER_SECRET`. Turn on `Read and write` permissions.

Finally, create a new Twitter list and fill out `TWITTER_LIST_OWNER` and `TWITTER_LIST_SLUG` (`twitter.com/:username/lists/:slug`).

<h4>Firebase</h4>

[Create an app](https://firebase.google.com/), fire up Firestore, and fill in `FIREBASE_API_KEY`.

</p>
</details>
