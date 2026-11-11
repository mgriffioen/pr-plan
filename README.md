# Puerto Rico trip planner

A small phone web app for planning and running a trip together. It's hosted on GitHub Pages and keeps the plan in Firebase, so edits sync live between phones and the plan still opens offline.

The site itself holds no trip details. Everything lives in Firebase behind one shared login, whose password is the passphrase.

Live site: https://mgriffioen.github.io/pr-plan/

## One-time setup (about 15 minutes)

### 1. Create the Firebase project
1. Go to https://console.firebase.google.com and click **Create a project**. Name it something like `pr-plan`. You can turn off Google Analytics.
2. **Build → Firestore Database → Create database.** Choose **production mode** and any US location.
3. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
4. **Authentication → Users → Add user**:
   - Email: `puertorico-trip@example.com` (it must match `firebase-config.js` and `firestore.rules`. It's only a login name and never receives mail.)
   - Password: **your trip passphrase**. Use 4 or more random words. This is what you and Emily type into the app.
5. **Authentication → Settings → User actions:** uncheck **Enable create (sign-up)**. Strangers then can't create their own logins.
6. **Firestore Database → Rules:** replace the rules with the contents of `firestore.rules` and click **Publish**.
7. **Project settings (gear) → General → Your apps → Web (`</>`):** register an app (no Firebase Hosting needed) and copy the `firebaseConfig` values into `firebase-config.js`.

### 2. Turn on GitHub Pages
Repo **Settings → Pages → Build and deployment:** Source **Deploy from a branch**, branch **main**, folder **/ (root)**. The site appears at the URL above within a minute or two.

### 3. Load the plan
On a computer, open the site, enter the passphrase, then click **Choose plan file** and pick `trip-plan-export.json`. That file is kept outside this repo on purpose: it holds the confirmation numbers. You only do this once. After that, both phones see the same plan.

### 4. Put it on each iPhone
1. Open the site in **Safari** and tap **Share → Add to Home Screen**.
2. Open it **from the new icon** and enter the passphrase. The home-screen app keeps its own sign-in, separate from Safari.
3. Do this while you have signal. After that, the plan opens offline, and edits made offline sync when the phone reconnects.

## Files
- `index.html`: the app
- `firebase-config.js`: Firebase project settings (public by design)
- `firestore.rules`: database rules; only the shared trip login can read or write
- `sw.js`, `manifest.webmanifest`, `icon-*.png`: home-screen install and offline support
