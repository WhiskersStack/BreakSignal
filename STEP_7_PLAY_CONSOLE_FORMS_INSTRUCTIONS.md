# Step 7: Play Console Forms Finalization Instructions

## Branch

Work from the completed Step 6 branch:

```text
6_PlayStorePrep_SignedAABPrep
```

Create a new branch for this work:

```bash
git checkout 6_PlayStorePrep_SignedAABPrep
git pull
git checkout -b 7_PlayStorePrep_PlayConsoleForms
```

## Goal

Prepare BreakSignal's Google Play Console form documentation so the app can later be submitted to closed testing with fewer mistakes.

This step is documentation and final-review preparation only.

Do not submit anything to Google Play Console from this branch.

Do not generate an AAB.

Do not create an upload keystore.

Do not commit screenshots, release binaries, signing files, passwords, or secrets.

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

Do not mark Play Console forms as submitted.

Do not mark closed testing as complete.

Do not mark the signed AAB as generated.

## Files To Review

Review these files before editing:

```text
PLAY_STORE_DEPLOYMENT.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
PLAY_STORE_DATA_SAFETY.md
PLAY_STORE_CONTENT_RATING_NOTES.md
PLAY_STORE_LISTING_DRAFT.md
PLAY_STORE_SCREENSHOT_PLAN.md
PLAY_STORE_SIGNED_AAB_GUIDE.md
CLOSED_TESTING_CHECKLIST.md
README.md
android/app/build.gradle
android/app/src/main/AndroidManifest.xml
capacitor.config.json
package.json
www/index.html
www/privacy.html
```

Reading source files is allowed for verification.

Editing source files is not allowed in this step unless a serious documentation mismatch is found and approved first.

## Files To Create Or Update

Create this file:

```text
PLAY_CONSOLE_FORM_CHECKLIST.md
```

Update these files as needed:

```text
PLAY_STORE_DEPLOYMENT.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
README.md
```

Only Markdown documentation changes should be committed.

## Required Content For PLAY_CONSOLE_FORM_CHECKLIST.md

Create a practical checklist for manually completing the Google Play Console forms.

Include these sections.

### 1. Purpose

Explain that this checklist is for manually completing Google Play Console forms before closed testing.

State clearly:

```text
This document does not replace the current Google Play Console UI or official policy wording. Re-check all answers inside Play Console before submission.
```

### 2. Pre-Console Technical Verification

Include this exact debug verification section.

```md
## Pre-Console Technical Verification

Before filling or submitting Play Console forms, verify the local app build:

- [ ] Run `npm install` if dependencies are missing locally.
- [ ] Run `npm run android:sync` if the script exists.
- [ ] If no script exists, run `npx cap sync android`.
- [ ] Open the `android/` project in Android Studio.
- [ ] Wait for Gradle sync to finish.
- [ ] Build and install the debug app locally.
- [ ] Launch the debug app on an emulator or real Android device.
- [ ] Confirm the BreakSignal icon appears correctly.
- [ ] Confirm the splash screen appears correctly.
- [ ] Confirm the timer screen loads without a blank screen or crash.
- [ ] Confirm Start, Pause, Reset, Done, Snooze, and Skip work.
- [ ] Confirm settings persist after closing and reopening the app.
- [ ] Confirm browser-only install, notification, SEO, and footer UI are hidden in Android.
- [ ] Confirm local history and clear-history behavior work.
- [ ] Confirm the privacy page opens and returns cleanly.

Note: the debug app is for local verification only. Do not upload a debug APK or debug AAB to Google Play.
```

### 3. App Access

Recommended answer:

```text
No special access instructions required.
```

Reason:

```text
BreakSignal has no login, account system, paywall, server-side access control, or restricted area.
```

Add a review note:

```text
Re-check if accounts, subscriptions, cloud sync, or gated features are added later.
```

### 4. Ads Declaration

Recommended answer:

```text
No, the app does not contain ads.
```

Evidence:

```text
No ad SDK, no ad UI, no monetization code, no external ad service.
```

### 5. Data Safety

Summarize proposed answers from `PLAY_STORE_DATA_SAFETY.md`:

```text
Data collection: No
Data sharing: No
Account required: No
Ads: No
Analytics: No
Backend database: No
External API for core timer behavior: No
Personal data collection: No
Local settings/history: stored on device only
```

Mention:

```text
The app uses localStorage for settings, counters, preferences, and recent break history.
The app does not send this data to a BreakSignal backend.
```

Add a warning:

```text
Review against the final release-candidate build before copying into Play Console.
```

### 6. Privacy Policy

Use:

```text
https://www.break-signal.com/privacy.html
```

Also mention repository copy:

```text
PRIVACY_POLICY.md
```

### 7. Content Rating

Reference:

```text
PLAY_STORE_CONTENT_RATING_NOTES.md
```

Recommended positioning:

```text
No violence
No sexual content
No profanity
No gambling
No user-generated content
No purchases
No ads
No location tracking
No account system
No medical treatment or diagnostic claims
```

Add a warning:

```text
Answer the live Play Console questionnaire exactly as shown, using the final app behavior as the source of truth.
```

### 8. Target Audience And Children

Recommended positioning:

```text
General productivity tool for people who work or study at a computer.
Not designed specifically for children.
No child-directed content.
No account system.
No ads.
No social features.
```

Do not invent an age rating if Play Console asks for a specific selection. Instead write:

```text
Select the appropriate target age group manually in Play Console after reviewing the current policy wording.
```

### 9. Store Listing

Reference:

```text
PLAY_STORE_LISTING_DRAFT.md
```

Use:

```text
App name: BreakSignal
Short description: Healthy break reminders for eyes, posture, stretching, walking, and focus.
Support email: support@break-signal.com
Support website: https://www.break-signal.com/
Privacy policy: https://www.break-signal.com/privacy.html
```

Claims to avoid:

```text
prevents eye damage
fixes posture
treats pain
cures focus problems
guarantees health benefits
best app
number one
medical advice
medical device
```

### 10. Graphics And Screenshots

Reference:

```text
PLAY_STORE_SCREENSHOT_PLAN.md
play-store-assets/metadata/screenshot-captions.md
play-store-assets/screenshots/
play-store-assets/feature-graphic/breaksignal-feature-graphic.png
```

Checklist:

```md
- [ ] Verify screenshot dimensions and quantity in current Play Console.
- [ ] Verify screenshots match the exact final release-candidate build.
- [ ] Verify feature graphic is 1024 x 500 px.
- [ ] Verify no image includes medical claims, Google Play badges, fake awards, pricing claims, personal data, or unrelated app content.
```

### 11. Closed Testing Track

Reference:

```text
CLOSED_TESTING_CHECKLIST.md
CLOSED_TESTING_FEEDBACK_TEMPLATE.md
PLAY_STORE_SIGNED_AAB_GUIDE.md
```

Document the future manual flow:

```text
Create closed testing track.
Add tester emails or Google Group.
Generate signed AAB manually outside Git.
Upload signed AAB manually.
Invite testers.
Collect feedback using the checklist and feedback template.
Fix blockers before production.
```

### 12. Final Pre-Submission Review

Include this checklist:

```md
- [ ] Debug app was built and installed locally for verification.
- [ ] Signed AAB guide exists.
- [ ] Upload keystore is still outside Git.
- [ ] Signed AAB has not been committed.
- [ ] No release artifacts are tracked.
- [ ] Privacy URL is final.
- [ ] Data Safety answers match the final build.
- [ ] Content rating answers match the final build.
- [ ] Store listing avoids medical and ranking claims.
- [ ] Screenshots and feature graphic match the final build.
- [ ] Closed testing is not marked complete until testers submit feedback and blockers are resolved.
```

## Required Updates To Existing Docs

### PLAY_STORE_DEPLOYMENT.md

Add a concise link to:

```text
PLAY_CONSOLE_FORM_CHECKLIST.md
```

Clarify that Play Console forms are completed manually after local debug verification and before/while setting up closed testing.

### PLAY_STORE_PREPARATION_INSTRUCTIONS.md

Add a checked item only for documentation being prepared:

```md
- [x] Play Console form checklist exists.
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

In the final review section, keep and clarify the debug-app step. Use this wording:

```md
3. Build and install the debug app locally for verification only; do not upload a debug build to Google Play.
```

### README.md

Add a link under Play Store preparation documents:

```md
- [Play Console form checklist](PLAY_CONSOLE_FORM_CHECKLIST.md)
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
PLAY_CONSOLE_FORM_CHECKLIST.md
PLAY_STORE_DEPLOYMENT.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
README.md
```

The instruction file itself may also remain present:

```text
STEP_7_PLAY_CONSOLE_FORMS_INSTRUCTIONS.md
```

## Final Codex Summary

When finished, summarize:

```text
Files changed
Play Console form checklist created: yes/no
Debug build verification wording included: yes/no
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
