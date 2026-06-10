# Step 6: Signed AAB Preparation Instructions

## Branch

Work from the completed Step 5 branch:

```text
5_PlayStorePrep_ClosedTesting
```

Create a new branch for this work:

```bash
git checkout 5_PlayStorePrep_ClosedTesting
git pull
git checkout -b 6_PlayStorePrep_SignedAABPrep
```

## Goal

Prepare BreakSignal for the future manual signed Android App Bundle upload to Google Play closed testing.

This step is documentation and safety preparation only.

Do not create a signed AAB in this branch.

Do not create an upload keystore in this branch.

Do not commit signing secrets, passwords, generated release binaries, or local machine files.

The goal is to create clear, safe instructions for manually generating the signed AAB later using Android Studio or Gradle, while keeping the repository clean.

## Current App Metadata

Use these values consistently:

```text
App name: BreakSignal
Developer: WhiskersStack
Application ID: com.whiskersstack.breaksignal
Version name: 1.0.0
Current versionCode: 1
Support email: support@break-signal.com
Support website: https://www.break-signal.com/
Privacy policy: https://www.break-signal.com/privacy.html
```

## Hard Rules

Do not change app behavior.

Do not change web app source files unless a documentation link requires it and it is explicitly justified.

Do not change Android source code.

Do not change Capacitor configuration.

Do not change package files.

Do not add dependencies.

Do not generate or commit:

```text
*.apk
*.aab
*.jks
*.keystore
key.properties
local.properties
google-services.json
```

Do not write real passwords, aliases, keystore paths, or personal machine paths into committed files.

Do not mark the signed AAB as complete.

Do not mark closed testing as complete.

## Files To Review

Review these files before editing:

```text
PLAY_STORE_DEPLOYMENT.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
CLOSED_TESTING_CHECKLIST.md
README.md
.gitignore
android/app/build.gradle
android/app/src/main/AndroidManifest.xml
capacitor.config.json
package.json
```

Reading Android/package files is allowed for verification.

Editing Android/package files is not allowed in this step unless a clear documentation-only inconsistency is found and approved first.

## Files To Create Or Update

Create this file:

```text
PLAY_STORE_SIGNED_AAB_GUIDE.md
```

Update these files as needed:

```text
PLAY_STORE_DEPLOYMENT.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
CLOSED_TESTING_CHECKLIST.md
README.md
```

Only documentation changes should be committed.

## Required Content For PLAY_STORE_SIGNED_AAB_GUIDE.md

Create a clear guide with these sections:

### 1. Purpose

Explain that this guide describes the future manual process for preparing a signed Android App Bundle for Google Play closed testing.

State clearly:

```text
This repository does not store signing credentials or generated release artifacts.
```

### 2. Current Release Identity

Document:

```text
App name: BreakSignal
Application ID: com.whiskersstack.breaksignal
Version name: 1.0.0
Version code: 1
Web source directory: www
Capacitor Android wrapper: android/
```

### 3. Pre-Build Checklist

Include a checklist like:

```md
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
```

### 4. Versioning Rule

Document:

```text
Every uploaded Google Play build must use a unique, increasing versionCode.
Do not reuse a versionCode after uploading it to Play Console.
Keep versionName human-readable.
```

Mention that the current project uses:

```text
versionCode 1
versionName 1.0.0
```

Do not change versionCode in this step.

### 5. Upload Keystore Safety

Explain:

```text
The upload keystore must be created manually and stored outside the Git repository.
Never commit .jks, .keystore, key.properties, passwords, aliases, or signing config secrets.
Use a password manager or secure private storage for keystore passwords.
Back up the upload keystore securely.
```

Do not include real commands with real passwords.

It is acceptable to include placeholder examples using obvious placeholders only, such as:

```text
<path-outside-repo>
<upload-key-alias>
<keystore-password>
<key-password>
```

### 6. Android Studio Manual Signed AAB Workflow

Document the future manual workflow:

```text
1. Open Android Studio.
2. Open the `android/` project.
3. Wait for Gradle sync to finish.
4. Select Build > Generate Signed Bundle / APK.
5. Choose Android App Bundle.
6. Select or create the upload keystore stored outside the repository.
7. Select the release build variant.
8. Generate the signed AAB locally.
9. Upload the signed AAB manually to the Google Play closed testing track.
10. Do not commit the generated AAB.
```

### 7. Optional Gradle Signing Notes

Add a short warning:

```text
Gradle signing configuration should not be committed with secrets.
If Gradle signing is automated later, secrets must come from local untracked files or CI secrets, not repository files.
```

Do not implement signing automation in this step.

### 8. Artifact Safety Check

Include commands:

```bash
git status --short
git ls-files | grep -E "(\.apk$|\.aab$|\.jks$|\.keystore$|key\.properties$|local\.properties$|google-services\.json$)"
```

Expected result for the second command:

```text
no output
```

### 9. After AAB Generation

Document that after generating the signed AAB locally, the user should:

```text
Upload it manually to Google Play Console closed testing.
Complete Play Console warnings and declarations.
Invite testers.
Collect feedback using CLOSED_TESTING_CHECKLIST.md and CLOSED_TESTING_FEEDBACK_TEMPLATE.md.
Fix blockers before production.
```

### 10. What Not To Commit

Include a clear list:

```text
Signed AAB files
APK files
Upload keystores
Keystore passwords
Key aliases if sensitive
key.properties
local.properties
google-services.json
Android Studio local caches
Gradle build folders
```

## Required Updates To Existing Docs

### PLAY_STORE_DEPLOYMENT.md

Add a concise section or link to:

```text
PLAY_STORE_SIGNED_AAB_GUIDE.md
```

Clarify that the signed AAB is generated manually later and is never committed.

### PLAY_STORE_PREPARATION_INSTRUCTIONS.md

Add a checked item only for documentation being prepared:

```md
- [x] Signed AAB preparation guide exists.
```

Keep these unchecked:

```md
- [ ] Create the upload keystore manually and store it outside Git.
- [ ] Generate the signed AAB manually after closed testing is complete.
- [ ] Complete the Google Play Console forms manually.
```

Do not mark signed AAB generation complete.

Do not mark keystore creation complete.

### CLOSED_TESTING_CHECKLIST.md

Add or confirm a release artifact safety line:

```md
- [ ] Confirm the signed AAB used for closed testing was generated locally and not committed to Git.
```

Keep closed testing unchecked.

### README.md

Add a link under Play Store preparation documents:

```md
- [Signed AAB preparation guide](PLAY_STORE_SIGNED_AAB_GUIDE.md)
```

Keep README concise.

## Validation Checklist

After editing, verify:

```text
Only Markdown documentation files changed.
No Android source files changed.
No Gradle files changed.
No Capacitor config changed.
No package files changed.
No APK/AAB files were created or tracked.
No keystore/signing files were created or tracked.
No passwords or secrets were written into the repository.
Closed testing is still not marked complete.
Signed AAB generation is still not marked complete.
Upload keystore creation is still not marked complete.
```

Run:

```bash
git status --short
git diff --name-only
git diff --check
git ls-files | grep -E "(\.apk$|\.aab$|\.jks$|\.keystore$|key\.properties$|local\.properties$|google-services\.json$)"
```

Expected tracked artifact check:

```text
no output
```

## Expected Changed Files

Expected changed files should be limited to:

```text
PLAY_STORE_SIGNED_AAB_GUIDE.md
PLAY_STORE_DEPLOYMENT.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
CLOSED_TESTING_CHECKLIST.md
README.md
```

The instruction file itself may also remain present:

```text
STEP_6_SIGNED_AAB_PREP_INSTRUCTIONS.md
```

## Final Codex Summary

When finished, summarize:

```text
Files changed
Signed AAB guide created: yes/no
Keystore created: no
Signed AAB generated: no
Release artifacts committed: no
Secrets committed: no
Preparation checklist updates
Remaining manual release tasks
Validation command results
Confirmation that no Android source, Gradle, Capacitor config, package, APK, AAB, keystore, or signing files changed
```
