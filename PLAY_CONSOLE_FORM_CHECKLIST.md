# BreakSignal Play Console Form Checklist

## Purpose

Use this checklist when manually completing Google Play Console forms before closed testing.

This document does not replace the current Google Play Console UI or official policy wording. Re-check all answers inside Play Console before submission.

Do not submit anything to Google Play Console from this repository workflow.

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

## App Access

Recommended answer:

```text
No special access instructions required.
```

Reason:

```text
BreakSignal has no login, account system, paywall, server-side access control, or restricted area.
```

Review note:

```text
Re-check if accounts, subscriptions, cloud sync, or gated features are added later.
```

## Ads Declaration

Recommended answer:

```text
No, the app does not contain ads.
```

Evidence:

```text
No ad SDK, no ad UI, no monetization code, no external ad service.
```

## Data Safety

Proposed answers from [PLAY_STORE_DATA_SAFETY.md](PLAY_STORE_DATA_SAFETY.md):

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

BreakSignal uses `localStorage` for settings, counters, preferences, and recent break history. The app does not send this data to a BreakSignal backend.

Review against the final release-candidate build before copying into Play Console.

## Privacy Policy

Use this public privacy policy URL:

```text
https://www.break-signal.com/privacy.html
```

Repository copy:

```text
PRIVACY_POLICY.md
```

## Content Rating

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

Answer the live Play Console questionnaire exactly as shown, using the final app behavior as the source of truth.

## Target Audience And Children

Recommended positioning:

```text
General productivity tool for people who work or study at a computer.
Not designed specifically for children.
No child-directed content.
No account system.
No ads.
No social features.
```

Do not invent an age rating in this document.

```text
Select the appropriate target age group manually in Play Console after reviewing the current policy wording.
```

## Store Listing

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

## Graphics And Screenshots

References:

```text
PLAY_STORE_SCREENSHOT_PLAN.md
play-store-assets/metadata/screenshot-captions.md
play-store-assets/screenshots/
play-store-assets/feature-graphic/breaksignal-feature-graphic.png
```

Checklist:

- [ ] Verify screenshot dimensions and quantity in current Play Console.
- [ ] Verify screenshots match the exact final release-candidate build.
- [ ] Verify feature graphic is 1024 x 500 px.
- [ ] Verify no image includes medical claims, Google Play badges, fake awards, pricing claims, personal data, or unrelated app content.

## Closed Testing Track

References:

```text
CLOSED_TESTING_CHECKLIST.md
CLOSED_TESTING_FEEDBACK_TEMPLATE.md
PLAY_STORE_SIGNED_AAB_GUIDE.md
```

Future manual flow:

```text
Create closed testing track.
Add tester emails or Google Group.
Generate signed AAB manually outside Git.
Upload signed AAB manually.
Invite testers.
Collect feedback using the checklist and feedback template.
Fix blockers before production.
```

## Final Pre-Submission Review

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
