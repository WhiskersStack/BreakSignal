# BreakSignal Play Store Preparation

This document tracks the repository work required before a future Google Play release.

## Release Guardrails

- Work on the `PlayStorePreparation` branch.
- Keep the app as HTML, CSS, Vanilla JavaScript, and a Capacitor Android wrapper.
- Do not create or commit a release keystore, upload key, signing password, or `key.properties`.
- Do not generate or commit a signed APK or Android App Bundle.
- Do not upload anything to Google Play Console from this repository workflow.
- Do not add analytics, ads, Firebase, accounts, a backend, or external APIs without reviewing the privacy and Data Safety documents.

## Current Android Identity

```text
Application ID: com.whiskersstack.breaksignal
App name: BreakSignal
Web directory: www
Version code: 1
Version name: 1.0.0
```

The application ID is the permanent Play Store identity and must not be changed.

## Safe Preparation Commands

Install dependencies:

```bash
npm install
```

Regenerate Android brand assets:

```bash
npm run assets:source
npm run assets:android
```

Sync the Capacitor Android project after changing files in `www/`:

```bash
npm run android:sync
```

Build a debug APK for local testing:

```bash
cd android
./gradlew :app:assembleDebug
```

On Windows PowerShell:

```powershell
cd android
.\gradlew.bat :app:assembleDebug
```

## Preparation Checklist

- [x] `node_modules/` is ignored and not tracked.
- [x] Android build output and `local.properties` are ignored.
- [x] Keystores, signing properties, APKs, and AABs are ignored.
- [x] Capacitor configuration uses the existing application ID and `www/` source directory.
- [x] Android launcher icons and splash screens use BreakSignal branding.
- [x] Website-only install and notification controls are hidden inside Android.
- [x] Service worker registration is disabled inside Capacitor.
- [x] Android local app data is excluded from Android backup.
- [x] Cleartext network traffic is disabled.
- [x] Android debug build and lint complete successfully.
- [x] Android unit and connected instrumentation tests pass.
- [x] Android app launches and core timer flows work on an emulator.
- [x] Website/PWA smoke test passes at desktop and mobile widths.
- [x] Privacy, Data Safety, store listing, screenshot, testing, content rating, and deployment drafts exist.
- [x] Privacy policy page exists at `www/privacy.html` and is intended for `https://www.break-signal.com/privacy.html`.
- [x] Play Store screenshot captions, alt text, capture notes, and feature graphic plan are documented.
- [x] Phone screenshots are captured at `1080 x 1920` in `play-store-assets/screenshots/`.
- [x] Feature graphic is created at `1024 x 500` in `play-store-assets/feature-graphic/`.
- [ ] Re-check visual assets against the exact final release-candidate build and current Play Console requirements before upload.
- [ ] Complete closed testing and collect tester feedback.
- [ ] Review [CLOSED_TESTING_FEEDBACK_TEMPLATE.md](CLOSED_TESTING_FEEDBACK_TEMPLATE.md) submissions and fix blocker issues.
- [ ] Create the upload keystore manually and store it outside Git.
- [ ] Generate the signed AAB manually after closed testing is complete.
- [ ] Complete the Google Play Console forms manually.

## Versioning Rule

Increment `versionCode` for every Google Play upload. Never reuse or decrease a version code. Keep `versionName` human-readable.

## Final Review

Before a release candidate is approved:

1. Review every preparation document against the current code.
2. Run `npm run android:sync`.
3. Build and install the debug app.
4. Complete [CLOSED_TESTING_CHECKLIST.md](CLOSED_TESTING_CHECKLIST.md).
5. Collect tester notes with [CLOSED_TESTING_FEEDBACK_TEMPLATE.md](CLOSED_TESTING_FEEDBACK_TEMPLATE.md).
6. Fix blocker issues before any production release decision.
7. Re-check the captured Play Store screenshots against the final release-candidate Android build.
8. Confirm the feature graphic is 1024 x 500 px and contains no medical claims, rankings, badges, or large text blocks.
9. Confirm no signing secrets or release binaries are tracked by Git.

## Current Verification

Preparation verification completed on June 4, 2026:

- `npm audit` reported no known dependency vulnerabilities.
- `npm run android:sync` completed successfully.
- `:app:assembleDebug` and `:app:lintDebug` completed successfully with zero lint errors.
- `:app:testDebugUnitTest` and `:app:connectedDebugAndroidTest` passed.
- Pixel 8 emulator smoke testing covered launch, Start, Pause, Reset, Test Reminder, Skip, settings persistence, offline launch, and crash logs.
- Capacitor runtime checks confirmed no service worker, no horizontal overflow, and no website-only install, notification, SEO, or footer UI.
- Website/PWA smoke testing covered desktop and mobile layouts, reminder modal interaction, and console health.
- No keystore, signed APK, signed AAB, signing secret, or Google Play upload was created.

Android lint still reports non-blocking notices for generated splash resources, unused Capacitor template resources, and available dependency/Gradle updates. These should be reviewed with the exact release candidate, but they do not block the current debug build or tests.
