# Step 5: Closed Testing Preparation Instructions

## Branch

Work from the completed Step 4 branch:

```text
4_PlayStorePrep_VisualAssets
```

Create a new branch for this work:

```bash
git checkout 4_PlayStorePrep_VisualAssets
git pull
git checkout -b 5_PlayStorePrep_ClosedTesting
```

## Goal

Prepare BreakSignal for Google Play closed testing.

This step is about release-candidate testing workflow, tester instructions, issue tracking, and Play Console readiness documentation.

It should not create signing credentials, signed bundles, APKs, AABs, keystores, or Play Console uploads.

## Hard Rules

Do not change app behavior.
Do not change Android source code.
Do not change Gradle files.
Do not change Capacitor configuration.
Do not change package files.
Do not create or commit APKs, AABs, keystores, signing files, or local properties.
Do not add analytics, ads, crash reporting, accounts, external APIs, or backend services.

## App Metadata

```text
App name: BreakSignal
Developer: WhiskersStack
Application ID: com.whiskersstack.breaksignal
Version name: 1.0.0
Support email: support@break-signal.com
Support website: https://www.break-signal.com/
Privacy policy: https://www.break-signal.com/privacy.html
```

## Files To Review And Update

Review and update only documentation files as needed:

```text
CLOSED_TESTING_CHECKLIST.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
PLAY_STORE_DEPLOYMENT.md
PLAY_STORE_DATA_SAFETY.md
PLAY_STORE_LISTING_DRAFT.md
PLAY_STORE_SCREENSHOT_PLAN.md
README.md
```

Create this file if useful:

```text
CLOSED_TESTING_FEEDBACK_TEMPLATE.md
```

## Required Work

### 1. Closed testing checklist

Make sure `CLOSED_TESTING_CHECKLIST.md` is ready for real testers and includes:

- build information
- install and launch checks
- timer start, pause, reset, complete, snooze, and skip checks
- settings persistence checks
- history and local data checks
- layout and accessibility checks
- visual asset checks
- offline launch and timer behavior
- tester feedback section
- final sign-off section

Keep unchecked boxes unchecked unless the task is actually complete.

### 2. Feedback template

If it does not already exist, create `CLOSED_TESTING_FEEDBACK_TEMPLATE.md` with these sections:

- tester name or initials
- device model
- Android version
- app version name
- app version code
- install result
- launch result
- timer flow feedback
- reminder modal feedback
- settings feedback
- visual/design feedback
- bugs found
- severity: low, medium, high, blocker
- reproduction steps
- screenshot or screen recording attached: yes/no
- final tester verdict: pass, pass with notes, fail

Do not collect sensitive personal data.

### 3. Play Console closed testing notes

Update `PLAY_STORE_DEPLOYMENT.md` or `PLAY_STORE_PREPARATION_INSTRUCTIONS.md` with a concise closed testing workflow:

- create closed testing track in Play Console
- add tester email list or Google Group
- upload signed AAB later, manually, outside this branch
- invite testers
- ask testers to complete checklist and feedback template
- fix blockers before production

Do not say closed testing is complete.

### 4. Data Safety and listing consistency

Confirm the docs still say:

- no account system
- no ads
- no analytics
- no backend database
- no external API for core timer behavior
- local settings and history stay on device
- not a medical device
- no medical advice

### 5. Final checklist update

In `PLAY_STORE_PREPARATION_INSTRUCTIONS.md`, add or confirm an unchecked item for:

```text
Complete closed testing and collect tester feedback.
```

Do not mark it complete.

## Validation

Run:

```bash
git status --short
git diff --name-only
```

Expected changed files should be Markdown docs only.

Run an artifact safety check:

```bash
git ls-files | grep -E "(\.apk$|\.aab$|\.jks$|\.keystore$|key\.properties$|local\.properties$|google-services\.json$)"
```

Expected output:

```text
no output
```

## Final Codex Summary

When finished, summarize:

```text
Files changed
Closed testing checklist updates
Feedback template created: yes/no
Remaining manual testing work
Confirmation that closed testing is not marked complete
Confirmation that no Android source, Gradle, package, signing, APK, or AAB files changed
```
