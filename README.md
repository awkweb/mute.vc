# mute.vc

Remove VC thought leadership and platitudes from your feed. 

## Scripts

| script       | description                               |
| ------------ | ------------------------------------------|
| `yarn build` | build for production                      |
| `yarn dev`   | serve with hot reload at `localhost:3000` |
| `yarn start` | launch server                             |

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
TWITTER_SECRET=xxxxxx
```

## Prod

Render doesn't support `sync` in `envVarGroups` yet so need to add a few secrets manually.

```yaml
envVarGroups:
- name: mute.vc
  envVars:
  ...
  - key: FIREBASE_API_KEY
    sync: false
  - key: TWITTER_KEY
    sync: false
  - key: TWITTER_SECRET
    sync: false
```