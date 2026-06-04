# BreakSignal Google Play Deployment

This is a preparation guide for a future manual Google Play release. It does not authorize automated creation of signing credentials or release binaries.

## Important Safety Rules

- Create the upload keystore manually and store it outside the repository.
- Never commit keystores, `key.properties`, passwords, signed APKs, or signed AABs.
- Do not send signing credentials through chat, issues, pull requests, or source files.
- Do not upload a build until closed testing and the Play Store preparation checklist are complete.

## Before Building A Release

1. Confirm the application ID remains `com.whiskersstack.breaksignal`.
2. Increment `versionCode` in `android/app/build.gradle` for every Play Store upload.
3. Keep `versionName` human-readable.
4. Review the privacy policy and Data Safety answers against the current code.
5. Complete the closed testing checklist.
6. Confirm the store listing, screenshots, support contact, and privacy policy URL are ready.

## Safe Local Verification

Sync the current web app into Android:

```bash
npm run android:sync
```

Build the debug variant:

```powershell
cd android
.\gradlew.bat :app:assembleDebug
```

The debug build is for local verification only. Do not upload it to Google Play.

## Future Manual Signed AAB Flow

Perform these steps manually after preparation and closed testing are complete:

1. Open Android Studio.
2. Open the `BreakSignal/android` project.
3. Select **Build > Generate Signed Bundle / APK**.
4. Choose **Android App Bundle**.
5. Select or create the upload keystore manually.
6. Enter signing credentials only in the Android Studio signing dialog.
7. Generate `app-release.aab`.
8. Upload the AAB to the appropriate Google Play Console testing track.
9. Complete the Play Console release notes and required declarations.
10. Review all warnings before submitting the release.

## Play Console Preparation

Complete these items manually in Google Play Console:

- App access
- Ads declaration
- Content rating questionnaire
- Data Safety form
- Privacy policy URL
- Target audience
- Store listing text
- App icon, feature graphic, and screenshots
- Support email and website
- Closed testing track and tester access

Use these repository drafts as references:

- [PRIVACY_POLICY.md](PRIVACY_POLICY.md)
- [PLAY_STORE_DATA_SAFETY.md](PLAY_STORE_DATA_SAFETY.md)
- [PLAY_STORE_LISTING_DRAFT.md](PLAY_STORE_LISTING_DRAFT.md)
- [PLAY_STORE_SCREENSHOT_PLAN.md](PLAY_STORE_SCREENSHOT_PLAN.md)
- [PLAY_STORE_CONTENT_RATING_NOTES.md](PLAY_STORE_CONTENT_RATING_NOTES.md)
- [CLOSED_TESTING_CHECKLIST.md](CLOSED_TESTING_CHECKLIST.md)

## Release Artifact Hygiene

Before committing or pushing any release-related change, run:

```bash
git status --short
git ls-files
```

Confirm that no `.jks`, `.keystore`, `key.properties`, `.apk`, `.aab`, `local.properties`, or signing secret is tracked.
