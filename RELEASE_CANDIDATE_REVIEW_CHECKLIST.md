# BreakSignal Release-Candidate Review Checklist

## Purpose

Use this checklist as the final internal review before any real Google Play closed testing upload.

This checklist does not mean the app is submitted, approved, or ready for production. It is a manual go / no-go review tool.

## Release Identity

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

If `versionCode` or `versionName` changes before upload, update this checklist and all Play Store docs before submitting anything.

## Repository Cleanliness

- [ ] `git status --short` is clean before release-candidate verification.
- [ ] No unexpected source changes are present.
- [ ] No generated Android build folders are tracked.
- [ ] No release artifacts are tracked.
- [ ] No signing files or secrets are tracked.
- [ ] `.gitignore` still blocks Android build output, local properties, keystores, APKs, AABs, and logs.

## Artifact And Secret Safety

Run these checks before any upload or release-related commit:

```bash
git status --short
git diff --name-only
git ls-files | grep -E "(\.apk$|\.aab$|\.jks$|\.keystore$|key\.properties$|local\.properties$|google-services\.json$)"
```

Expected result for the final command:

```text
no output
```

- [ ] No `.apk` files are tracked.
- [ ] No `.aab` files are tracked.
- [ ] No `.jks` or `.keystore` files are tracked.
- [ ] No `key.properties` file is tracked.
- [ ] No `local.properties` file is tracked.
- [ ] No `google-services.json` file is tracked.
- [ ] No passwords, signing aliases, or local machine paths are committed.

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

## Privacy Policy Review

References:

```text
www/privacy.html
PRIVACY_POLICY.md
https://www.break-signal.com/privacy.html
```

- [ ] Privacy policy URL is correct and public.
- [ ] Privacy page uses BreakSignal branding.
- [ ] Developer is WhiskersStack.
- [ ] Contact email is support@break-signal.com.
- [ ] Effective date is June 6, 2026.
- [ ] Policy states localStorage use clearly.
- [ ] Policy states no account, ads, analytics, backend database, or external API for core timer behavior.
- [ ] Policy does not make medical claims.
- [ ] Repository copy and hosted page are consistent.

## Data Safety Review

References:

```text
PLAY_STORE_DATA_SAFETY.md
PLAY_CONSOLE_FORM_CHECKLIST.md
```

- [ ] Data collection answer matches the final build.
- [ ] Data sharing answer matches the final build.
- [ ] Ads answer matches the final build.
- [ ] Account/login answer matches the final build.
- [ ] LocalStorage behavior is accurately described.
- [ ] No analytics, crash reporting, cloud sync, native notifications, or external APIs were added without updating Data Safety docs.
- [ ] Android permissions still match the documented behavior.

## Content Rating Review

Reference:

```text
PLAY_STORE_CONTENT_RATING_NOTES.md
```

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

## Store Listing Review

Reference:

```text
PLAY_STORE_LISTING_DRAFT.md
```

- [ ] App name is BreakSignal.
- [ ] Short description is accurate.
- [ ] Full description matches the final app.
- [ ] Support email is support@break-signal.com.
- [ ] Support website is https://www.break-signal.com/.
- [ ] Privacy policy URL is https://www.break-signal.com/privacy.html.
- [ ] Listing avoids medical guarantees.
- [ ] Listing avoids ranking claims such as best app or number one.
- [ ] Listing avoids claims that the app prevents eye damage, fixes posture, treats pain, or cures focus problems.

## Visual Assets Review

References:

```text
PLAY_STORE_SCREENSHOT_PLAN.md
play-store-assets/metadata/screenshot-captions.md
play-store-assets/screenshots/
play-store-assets/feature-graphic/breaksignal-feature-graphic.png
```

- [ ] Phone screenshots exist.
- [ ] Phone screenshots are `1080 x 1920` or otherwise valid under current Play Console requirements.
- [ ] Feature graphic exists.
- [ ] Feature graphic is `1024 x 500`.
- [ ] Screenshots match the exact final release-candidate Android build.
- [ ] Screenshots do not show personal notifications or unrelated apps.
- [ ] Screenshots do not show browser-only Android-hidden UI.
- [ ] Screenshots and feature graphic contain no medical claims, fake awards, rankings, pricing claims, or Google Play badges.
- [ ] Screenshot captions and alt text match `play-store-assets/metadata/screenshot-captions.md`.

## Signed AAB Preparation Review

Reference:

```text
PLAY_STORE_SIGNED_AAB_GUIDE.md
```

- [ ] Signed AAB guide exists.
- [ ] Upload keystore will be created manually and stored outside Git.
- [ ] Upload keystore has not been committed.
- [ ] Signed AAB has not been committed.
- [ ] Version code is unique before any Play Console upload.
- [ ] Signed AAB will be generated manually through Android Studio or another safe local process.
- [ ] Signing credentials will not be shared in chat, issues, pull requests, or source files.

## Play Console Forms Review

Reference:

```text
PLAY_CONSOLE_FORM_CHECKLIST.md
```

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

## Closed Testing Review

References:

```text
CLOSED_TESTING_CHECKLIST.md
CLOSED_TESTING_FEEDBACK_TEMPLATE.md
```

- [ ] Closed testing checklist exists.
- [ ] Feedback template exists.
- [ ] Tester list or Google Group is ready outside the repository.
- [ ] Testers know not to submit sensitive personal data in feedback.
- [ ] Feedback process covers install, launch, timer flow, modal, settings, local data, offline behavior, visual design, bugs, and final verdict.
- [ ] Closed testing is not marked complete before tester feedback is reviewed and blockers are resolved.

## Go / No-Go Decision

Current decision: Not submitted yet.

- [ ] GO: ready to create/upload signed AAB to closed testing manually.
- [ ] NO-GO: blockers remain.

Reviewer:
Date:
Blocking issues:
Required fixes before upload:
