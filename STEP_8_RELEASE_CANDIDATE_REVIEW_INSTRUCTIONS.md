# Step 8: Final Release-Candidate Review Instructions

## Branch

Work from the completed Step 7 branch:

```text
7_PlayStorePrep_PlayConsoleForms
```

Create a new branch for this work:

```bash
git checkout 7_PlayStorePrep_PlayConsoleForms
git pull
git checkout -b 8_PlayStorePrep_FinalRCReview
```

## Goal

Create one master release-candidate review checklist for BreakSignal before any real Google Play upload or closed testing submission.

This step is documentation and release-readiness preparation only.

The checklist should tie together:

```text
local debug verification
privacy policy
Data Safety
content rating
store listing
visual assets
signed AAB preparation
closed testing
Play Console forms
artifact and secret safety
final go / no-go decision
```

Do not submit anything to Google Play Console.

Do not generate a signed AAB.

Do not create an upload keystore.

Do not mark closed testing complete.

Do not mark Play Console forms complete.

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
Website: https://www.break-signal.com/
```

## Hard Rules

Do not change app behavior.

Do not change web app source files.

Do not change Android source files.

Do not change Gradle files.

Do not change Capacitor configuration.

Do not change package files.

Do not add dependencies.

Do not create or commit:

```text
*.apk
*.aab
*.jks
*.keystore
key.properties
local.properties
google-services.json
passwords
real signing aliases
personal machine paths
```

Do not mark release-candidate review as complete unless this branch actually performs no-code checklist preparation only and clearly leaves all manual verification items unchecked.

## Files To Review

Review these files before editing:

```text
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
PLAY_STORE_DEPLOYMENT.md
PLAY_CONSOLE_FORM_CHECKLIST.md
PLAY_STORE_SIGNED_AAB_GUIDE.md
PLAY_STORE_DATA_SAFETY.md
PLAY_STORE_CONTENT_RATING_NOTES.md
PLAY_STORE_LISTING_DRAFT.md
PLAY_STORE_SCREENSHOT_PLAN.md
CLOSED_TESTING_CHECKLIST.md
CLOSED_TESTING_FEEDBACK_TEMPLATE.md
PRIVACY_POLICY.md
README.md
www/privacy.html
www/index.html
android/app/build.gradle
android/app/src/main/AndroidManifest.xml
capacitor.config.json
package.json
```

Reading source files is allowed for verification.

Editing source files is not allowed in this step.

## Files To Create Or Update

Create this file:

```text
RELEASE_CANDIDATE_REVIEW_CHECKLIST.md
```

Update these files as needed:

```text
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
PLAY_STORE_DEPLOYMENT.md
README.md
```

Only Markdown documentation changes should be committed.

## Required Content For RELEASE_CANDIDATE_REVIEW_CHECKLIST.md

Create a practical final review checklist with the sections below.

### 1. Purpose

Explain that this checklist is the final internal review before any real Google Play closed testing upload.

State clearly:

```text
This checklist does not mean the app is submitted, approved, or ready for production. It is a manual go / no-go review tool.
```

### 2. Release Identity

Document:

```text
App name: BreakSignal
Developer: WhiskersStack
Application ID: com.whiskersstack.breaksignal
Version name: 1.0.0
Version code: 1
Support email: support@break-signal.com
Support website: https://www.break-signal.com/
Privacy policy: https://www.break-signal.com/privacy.html
```

Add a note:

```text
If versionCode or versionName changes before upload, update this checklist and all Play Store docs before submitting anything.
```

### 3. Repository Cleanliness

Include:

```md
- [ ] `git status --short` is clean before release-candidate verification.
- [ ] No unexpected source changes are present.
- [ ] No generated Android build folders are tracked.
- [ ] No release artifacts are tracked.
- [ ] No signing files or secrets are tracked.
- [ ] `.gitignore` still blocks Android build output, local properties, keystores, APKs, AABs, and logs.
```

### 4. Artifact And Secret Safety

Include these commands:

```bash
git status --short
git diff --name-only
git ls-files | grep -E "(\.apk$|\.aab$|\.jks$|\.keystore$|key\.properties$|local\.properties$|google-services\.json$)"
```

Expected result for the final command:

```text
no output
```

Add checklist:

```md
- [ ] No `.apk` files are tracked.
- [ ] No `.aab` files are tracked.
- [ ] No `.jks` or `.keystore` files are tracked.
- [ ] No `key.properties` file is tracked.
- [ ] No `local.properties` file is tracked.
- [ ] No `google-services.json` file is tracked.
- [ ] No passwords, signing aliases, or local machine paths are committed.
```

### 5. Local Debug Verification

Include this exact section:

```md
## Local Debug Verification

The debug app is only for local verification. Do not upload a debug APK or debug AAB to Google Play.

- [ ] Run `npm install` if dependencies are missing locally.
- [ ] Run `npm run android:sync` if the script exists.
- [ ] If no script exists, run `npx cap sync android`.
- [ ] Open the `android/` project in Android Studio.
- [ ] Wait for Gradle sync to finish.
- [ ] Build and install the debug app locally.
- [ ] Launch the debug app on an emulator or real Android device.
- [ ] Confirm the BreakSignal launcher icon appears correctly.
- [ ] Confirm the splash screen appears correctly.
- [ ] Confirm the main timer screen loads without a blank screen or crash.
- [ ] Confirm Start, Pause, Reset, Done, Snooze, and Skip work.
- [ ] Confirm a real timer interval can complete and show a reminder.
- [ ] Confirm settings persist after closing and reopening the app.
- [ ] Confirm daily stats and local break history update.
- [ ] Confirm clear-history behavior works.
- [ ] Confirm offline launch and timer behavior work.
- [ ] Confirm browser-only install, notification, SEO, and footer UI are hidden in Android.
- [ ] Confirm the privacy page opens and Android back navigation behaves correctly.
```

### 6. Privacy Policy Review

Reference:

```text
www/privacy.html
PRIVACY_POLICY.md
https://www.break-signal.com/privacy.html
```

Checklist:

```md
- [ ] Privacy policy URL is correct and public.
- [ ] Privacy page uses BreakSignal branding.
- [ ] Developer is WhiskersStack.
- [ ] Contact email is support@break-signal.com.
- [ ] Effective date is June 6, 2026.
- [ ] Policy states localStorage use clearly.
- [ ] Policy states no account, ads, analytics, backend database, or external API for core timer behavior.
- [ ] Policy does not make medical claims.
- [ ] Repository copy and hosted page are consistent.
```

### 7. Data Safety Review

Reference:

```text
PLAY_STORE_DATA_SAFETY.md
PLAY_CONSOLE_FORM_CHECKLIST.md
```

Checklist:

```md
- [ ] Data collection answer matches the final build.
- [ ] Data sharing answer matches the final build.
- [ ] Ads answer matches the final build.
- [ ] Account/login answer matches the final build.
- [ ] LocalStorage behavior is accurately described.
- [ ] No analytics, crash reporting, cloud sync, native notifications, or external APIs were added without updating Data Safety docs.
- [ ] Android permissions still match the documented behavior.
```

### 8. Content Rating Review

Reference:

```text
PLAY_STORE_CONTENT_RATING_NOTES.md
```

Checklist:

```md
- [ ] No violence.
- [ ] No sexual content.
- [ ] No profanity.
- [ ] No gambling.
- [ ] No user-generated content.
- [ ] No purchases.
- [ ] No ads.
- [ ] No location tracking.
- [ ] No account system.
- [ ] No medical treatment or diagnostic claims.
- [ ] Live Play Console questionnaire is answered using the final app behavior as the source of truth.
```

### 9. Store Listing Review

Reference:

```text
PLAY_STORE_LISTING_DRAFT.md
```

Checklist:

```md
- [ ] App name is BreakSignal.
- [ ] Short description is accurate.
- [ ] Full description matches the final app.
- [ ] Support email is support@break-signal.com.
- [ ] Support website is https://www.break-signal.com/.
- [ ] Privacy policy URL is https://www.break-signal.com/privacy.html.
- [ ] Listing avoids medical guarantees.
- [ ] Listing avoids ranking claims such as best app or number one.
- [ ] Listing avoids claims that the app prevents eye damage, fixes posture, treats pain, or cures focus problems.
```

### 10. Visual Assets Review

References:

```text
PLAY_STORE_SCREENSHOT_PLAN.md
play-store-assets/metadata/screenshot-captions.md
play-store-assets/screenshots/
play-store-assets/feature-graphic/breaksignal-feature-graphic.png
```

Checklist:

```md
- [ ] Phone screenshots exist.
- [ ] Phone screenshots are `1080 x 1920` or otherwise valid under current Play Console requirements.
- [ ] Feature graphic exists.
- [ ] Feature graphic is `1024 x 500`.
- [ ] Screenshots match the exact final release-candidate Android build.
- [ ] Screenshots do not show personal notifications or unrelated apps.
- [ ] Screenshots do not show browser-only Android-hidden UI.
- [ ] Screenshots and feature graphic contain no medical claims, fake awards, rankings, pricing claims, or Google Play badges.
- [ ] Screenshot captions and alt text match `play-store-assets/metadata/screenshot-captions.md`.
```

### 11. Signed AAB Preparation Review

Reference:

```text
PLAY_STORE_SIGNED_AAB_GUIDE.md
```

Checklist:

```md
- [ ] Signed AAB guide exists.
- [ ] Upload keystore will be created manually and stored outside Git.
- [ ] Upload keystore has not been committed.
- [ ] Signed AAB has not been committed.
- [ ] Version code is unique before any Play Console upload.
- [ ] Signed AAB will be generated manually through Android Studio or another safe local process.
- [ ] Signing credentials will not be shared in chat, issues, pull requests, or source files.
```

### 12. Play Console Forms Review

Reference:

```text
PLAY_CONSOLE_FORM_CHECKLIST.md
```

Checklist:

```md
- [ ] App Access reviewed.
- [ ] Ads declaration reviewed.
- [ ] Data Safety form reviewed.
- [ ] Privacy policy URL reviewed.
- [ ] Content rating reviewed.
- [ ] Target audience reviewed.
- [ ] Store listing reviewed.
- [ ] Graphics and screenshots reviewed.
- [ ] Closed testing track plan reviewed.
- [ ] No Play Console form is marked complete until it is manually completed in Play Console.
```

### 13. Closed Testing Review

References:

```text
CLOSED_TESTING_CHECKLIST.md
CLOSED_TESTING_FEEDBACK_TEMPLATE.md
```

Checklist:

```md
- [ ] Closed testing checklist exists.
- [ ] Feedback template exists.
- [ ] Tester list or Google Group is ready outside the repository.
- [ ] Testers know not to submit sensitive personal data in feedback.
- [ ] Feedback process covers install, launch, timer flow, modal, settings, local data, offline behavior, visual design, bugs, and final verdict.
- [ ] Closed testing is not marked complete before tester feedback is reviewed and blockers are resolved.
```

### 14. Go / No-Go Decision

Add this final decision block:

```md
## Go / No-Go Decision

Current decision: Not submitted yet.

- [ ] GO: ready to create/upload signed AAB to closed testing manually.
- [ ] NO-GO: blockers remain.

Reviewer:
Date:
Blocking issues:
Required fixes before upload:
```

## Required Updates To Existing Docs

### PLAY_STORE_PREPARATION_INSTRUCTIONS.md

Add a checked item only for documentation being prepared:

```md
- [x] Release-candidate review checklist exists.
```

Keep these unchecked:

```md
- [ ] Re-check visual assets against the exact final release-candidate build and current Play Console requirements before upload.
- [ ] Complete closed testing and collect tester feedback.
- [ ] Review CLOSED_TESTING_FEEDBACK_TEMPLATE.md submissions and fix blocker issues.
- [ ] Create the upload keystore manually and store it outside Git.
- [ ] Generate the signed AAB manually after closed testing is complete.
- [ ] Complete the Google Play Console forms manually.
```

Do not mark release-candidate review complete.

Do not mark closed testing complete.

### PLAY_STORE_DEPLOYMENT.md

Add a concise link to:

```text
RELEASE_CANDIDATE_REVIEW_CHECKLIST.md
```

Clarify that it should be completed before any signed AAB upload to closed testing.

### README.md

Add a link under Play Store preparation documents:

```md
- [Release-candidate review checklist](RELEASE_CANDIDATE_REVIEW_CHECKLIST.md)
```

Keep README concise.

## Validation Checklist

After editing, verify:

```text
Only Markdown documentation files changed.
No Android source files changed.
No web source files changed.
No Gradle files changed.
No Capacitor config changed.
No package files changed.
No APK/AAB files were created or tracked.
No keystore/signing files were created or tracked.
No passwords, real signing aliases, or secrets were written into the repository.
Release-candidate review is not falsely marked complete.
Play Console forms are still not marked complete.
Closed testing is still not marked complete.
Signed AAB generation is still not marked complete.
Debug build is described only as local verification.
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
RELEASE_CANDIDATE_REVIEW_CHECKLIST.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
PLAY_STORE_DEPLOYMENT.md
README.md
```

The instruction file itself may also remain present:

```text
STEP_8_RELEASE_CANDIDATE_REVIEW_INSTRUCTIONS.md
```

## Final Codex Summary

When finished, summarize:

```text
Files changed
Release-candidate review checklist created: yes/no
Debug build verification included: yes/no
Go / no-go decision block included: yes/no
Play Console forms completed/submitted: no
Closed testing completed: no
Signed AAB generated: no
Keystore created: no
Release artifacts committed: no
Secrets committed: no
Preparation checklist updates
Remaining manual release tasks
Validation command results
Confirmation that no Android source, web source, Gradle, Capacitor config, package, APK, AAB, keystore, or signing files changed
```
