## mute.vc

Remove VC thought leadership and platitudes from your feed.

View [screenshots](.github/screenshots)

## Scripts

| Script       | Description                               |
| ------------ | ------------------------------------------|
| `yarn build` | Build for production                      |
| `yarn dev`   | Serve with hot reload at `localhost:3000` |
| `yarn start` | Launch server                             |

## Dev

Create a `.env` file in project root:

```
FIREBASE_API_KEY=xxxxxx
FIREBASE_AUTH_DOMAIN=mutevc.firebaseapp.com
FIREBASE_PROJECT_ID=mutevc
NUXT_HOST=localhost
NUXT_PORT=3000
SECRET=supersecret
TWITTER_KEY=xxxxxx
TWITTER_LIST_OWNER=tomfme
TWITTER_LIST_SLUG=investors
TWITTER_SECRET=xxxxxx
```

<details>
<summary>How to fill in secret values</summary>
<p>

<h4>Twitter</h4>

Create a [new Twitter app](https://developer.twitter.com) and add the following callback urls:

```
http://localhost:3000/auth/twitter/callback
https://mute-vc.onrender.com/auth/twitter/callback
https://mute.vc/auth/twitter/callback
```

Add your consumer `API key` to `TWITTER_KEY` and `API secret key` to `TWITTER_SECRET`. Turn on `Read and write` permissions.

Finally, create a new Twitter list and fill out `TWITTER_LIST_OWNER` and `TWITTER_LIST_SLUG` (`twitter.com/:username/lists/:slug`).

<h4>Firebase</h4>

[Create an app](https://firebase.google.com/), fire up Firestore, and fill in `FIREBASE_API_KEY`.

</p>
</details>

## Prod

Deploy on [Render](https://render.com) ([`render.yaml`](render.yaml) does the heavy lifting).

## Tools

An incomplete list of tools I used:

- [Feather](https://feathericons.com/)
- [Figma](https://www.figma.com/c/file/796516444238599837)
- [Firebase](https://firebase.google.com/)
- [HEY META](https://www.heymeta.com/)
- [Linear](https://linear.app/)
- [Nuxt](https://nuxtjs.org/)
- [Render](https://render.com/)
- [Simple Analytics](https://simpleanalytics.com/)
- [Tailwind](https://tailwindcss.com/)
- [Twitter](https://twitter.com/)
- [VS Code](https://code.visualstudio.com/)

See [package.json](package.json) for JS packages.

## License

[MIT](.github/LICENSE) © [Tom Meagher](https://meagher.co)
