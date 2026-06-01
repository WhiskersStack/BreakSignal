# BreakSignal Play Store Deployment

BreakSignal is a static Progressive Web App. The simplest Play Store path is to package the live PWA as an Android app using a Trusted Web Activity (TWA), then upload the generated Android App Bundle (`.aab`) to Google Play Console.

## Recommended Package Details

- App name: `BreakSignal`
- Package name: `com.breaksignal.app`
- Start URL: `https://www.break-signal.com/`
- Manifest URL: `https://www.break-signal.com/manifest.webmanifest`
- App category: Productivity, Health, or Utilities
- Pricing: Free

## Prerequisites

1. A Google Play Developer account.
2. The production site must be available over HTTPS:
   `https://www.break-signal.com/`
3. Node.js installed locally.
4. Java Development Kit installed locally.
5. Android Studio installed locally, or Android command-line build tools available.

## 1. Verify The PWA

Before creating the Android wrapper, confirm these URLs work in a browser:

```text
https://www.break-signal.com/
https://www.break-signal.com/manifest.webmanifest
https://www.break-signal.com/service-worker.js
https://www.break-signal.com/assets/icons/icon-512.png
https://www.break-signal.com/assets/icons/maskable-512.png
```

The current repo already includes the required PWA files:

```text
manifest.webmanifest
service-worker.js
assets/icons/icon-192.png
assets/icons/icon-512.png
assets/icons/maskable-512.png
```

## 2. Generate The Android TWA Project

From a working folder outside the deployed static site, run:

```powershell
npx @bubblewrap/cli init --manifest=https://www.break-signal.com/manifest.webmanifest --directory=android
```

Suggested answers:

```text
Application ID / package name: com.breaksignal.app
Application name: BreakSignal
Launcher name: BreakSignal
Host: www.break-signal.com
Start URL: /
Theme color: #070B14
Navigation color: #070B14
Display mode: standalone
Orientation: portrait
```

Then build the release bundle:

```powershell
cd android
npx @bubblewrap/cli build
```

The output should include an `.aab` file for Google Play upload.

## 3. Add Digital Asset Links

Trusted Web Activity needs a public file at:

```text
https://www.break-signal.com/.well-known/assetlinks.json
```

Use this template after you know the SHA-256 signing certificate fingerprint:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.breaksignal.app",
      "sha256_cert_fingerprints": [
        "REPLACE_WITH_SHA256_FINGERPRINT"
      ]
    }
  }
]
```

Important: the upload key fingerprint and the Google Play app signing fingerprint can be different. For the Play Store release, use the fingerprint shown in Play Console under app signing / app integrity after the app is created.

Once the fingerprint is known, create:

```text
.well-known/assetlinks.json
```

Then redeploy the static site so Google can read:

```text
https://www.break-signal.com/.well-known/assetlinks.json
```

## 4. Create The Play Console App

In Google Play Console:

1. Create app.
2. App name: `BreakSignal`.
3. Default language: English.
4. App or game: App.
5. Free or paid: Free.
6. Fill the app access, ads, content rating, target audience, data safety, and privacy policy sections.
7. Upload the generated `.aab` to an internal testing release first.

Google Play currently requires Android App Bundles for new Play-distributed apps and enforces current target API requirements, so keep the generated Android project and Bubblewrap dependencies up to date before release.

## 5. Store Listing Assets

Use the existing screenshots as a starting point:

```text
assets/screenshots/breaksignal-dashboard.png
assets/screenshots/breaksignal-settings.png
assets/screenshots/breaksignal-modal.png
assets/screenshots/breaksignal-mobile.png
```

Prepare Play Store graphics:

```text
App icon: 512 x 512 PNG
Feature graphic: 1024 x 500 PNG
Phone screenshots: at least 2
Short description: Calm break reminders for eyes, posture, stretching, walking, and focus.
Full description: Describe BreakSignal as a free break timer that stores preferences locally and does not require an account.
```

## 6. Privacy Policy Notes

BreakSignal stores settings and break history in the user's browser using `localStorage`. It does not require an account, backend, database, or external API.

If the Play Console data safety form asks about collected data, answer based on the deployed production behavior. For the current app, local-only settings and history are not transmitted to a server.

You still need a public privacy policy URL for Play Console. A simple privacy policy page on `www.break-signal.com` is enough if it accurately explains the local-only storage behavior.

## 7. Release Flow

Recommended rollout order:

1. Internal testing.
2. Closed testing, if required for the account.
3. Production review.
4. Staged rollout.
5. Full rollout after no issues are reported.

## Common Failure Points

- `assetlinks.json` is missing or uses the wrong SHA-256 fingerprint.
- The PWA manifest URL is not reachable over HTTPS.
- Icons are not reachable from the live domain.
- The Android package name changes after Play Console app creation.
- The app bundle targets an outdated Android API level.
- The privacy policy does not match the app's actual behavior.
