# BreakSignal Signed AAB Preparation Guide

## Purpose

This guide describes the future manual process for preparing a signed Android App Bundle for Google Play closed testing.

This repository does not store signing credentials or generated release artifacts.

Use this guide after the release candidate has been reviewed, closed testing preparation is ready, and you are ready to generate a signed AAB manually outside Git.

## Current Release Identity

```text
App name: BreakSignal
Developer: WhiskersStack
Application ID: com.whiskersstack.breaksignal
Version name: 1.0.0
Version code: 1
Web source directory: www
Capacitor Android wrapper: android/
Support email: support@break-signal.com
Support website: https://www.break-signal.com/
Privacy policy: https://www.break-signal.com/privacy.html
```

## Pre-Build Checklist

- [ ] Confirm `git status --short` is clean.
- [ ] Confirm no unexpected source changes are present.
- [ ] Confirm `node_modules/` is not tracked.
- [ ] Confirm `android/local.properties` is not tracked.
- [ ] Confirm no keystore, APK, or AAB files are tracked.
- [ ] Run `npm install` if dependencies are missing locally.
- [ ] Run `npm run android:sync` if the script exists.
- [ ] If no script exists, run `npx cap sync android`.
- [ ] Open Android Studio and sync Gradle.
- [ ] Run a debug build locally before release signing.
- [ ] Test the app on an emulator or real device.

## Versioning Rule

Every uploaded Google Play build must use a unique, increasing `versionCode`.

Do not reuse a `versionCode` after uploading it to Play Console. Keep `versionName` human-readable.

The current project uses:

```text
versionCode 1
versionName 1.0.0
```

Do not change `versionCode` or `versionName` in this documentation-preparation step.

## Upload Keystore Safety

The upload keystore must be created manually and stored outside the Git repository.

Never commit:

- `.jks` files
- `.keystore` files
- `key.properties`
- Keystore passwords
- Key passwords
- Signing config secrets
- Generated APK or AAB files

Use a password manager or secure private storage for keystore passwords. Back up the upload keystore securely. Losing the upload keystore can block future app updates unless Google Play upload key reset options are available.

Placeholder examples are acceptable in notes:

```text
<path-outside-repo>
<upload-key-alias>
<keystore-password>
<key-password>
```

Do not replace these placeholders with real values in committed files.

## Android Studio Manual Signed AAB Workflow

Perform this later, manually, after closed testing preparation is ready:

1. Open Android Studio.
2. Open the `android/` project.
3. Wait for Gradle sync to finish.
4. Select **Build > Generate Signed Bundle / APK**.
5. Choose **Android App Bundle**.
6. Select or create the upload keystore stored outside the repository.
7. Select the release build variant.
8. Generate the signed AAB locally.
9. Upload the signed AAB manually to the Google Play closed testing track.
10. Do not commit the generated AAB.

## Optional Gradle Signing Notes

Gradle signing configuration should not be committed with secrets.

If Gradle signing is automated later, secrets must come from local untracked files or CI secrets, not repository files.

Do not implement signing automation in this step.

## Artifact Safety Check

Before committing or pushing release-preparation changes, run:

```bash
git status --short
git ls-files | grep -E "(\.apk$|\.aab$|\.jks$|\.keystore$|key\.properties$|local\.properties$|google-services\.json$)"
```

Expected result for the second command:

```text
no output
```

## After AAB Generation

After generating the signed AAB locally:

- Upload it manually to Google Play Console closed testing.
- Complete Play Console warnings and declarations.
- Invite testers.
- Collect feedback using [CLOSED_TESTING_CHECKLIST.md](CLOSED_TESTING_CHECKLIST.md) and [CLOSED_TESTING_FEEDBACK_TEMPLATE.md](CLOSED_TESTING_FEEDBACK_TEMPLATE.md).
- Fix blockers before production.

## What Not To Commit

Do not commit:

- Signed AAB files
- APK files
- Upload keystores
- Keystore passwords
- Key aliases if sensitive
- `key.properties`
- `local.properties`
- `google-services.json`
- Android Studio local caches
- Gradle build folders
