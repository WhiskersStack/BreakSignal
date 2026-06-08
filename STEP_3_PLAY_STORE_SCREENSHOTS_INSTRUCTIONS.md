# Step 3: Play Store Screenshot And Feature Graphic Instructions

## Branch

Work on this branch:

```text
3_PlayStorePrep_Screenshots
```

This branch was created from:

```text
2_PlayStorePrep_Metadata
```

## Goal

Prepare BreakSignal's Google Play visual asset workflow for the release-candidate Android app.

This step is about screenshots, captions, feature graphic planning, and final visual asset documentation.

Do not change the app behavior.

Do not change Android source code unless explicitly required for visual capture and approved first.

Do not change Gradle files.

Do not create APKs, AABs, keystores, signing files, or release artifacts.

Do not add dependencies.

## Current App Metadata

Use these values consistently:

```text
App name: BreakSignal
Developer: WhiskersStack
Application ID: com.whiskersstack.breaksignal
Version name: 1.0.0
Support email: support@break-signal.com
Support website: https://www.break-signal.com/
Privacy policy: https://www.break-signal.com/privacy.html
```

## Official Requirements To Respect

Before final upload, verify the current requirements directly in Google Play Console.

Use these current planning constraints:

### App icon

```text
Format: 32-bit PNG with alpha
Size: 512 x 512 px
Maximum file size: 1024 KB
```

### Feature graphic

```text
Format: JPEG or 24-bit PNG, no alpha
Size: 1024 x 500 px
```

### Phone screenshots

```text
Minimum required: 2 screenshots across supported device types
Recommended for apps: at least 4 screenshots
Format: JPEG or 24-bit PNG, no alpha
Minimum dimension: 320 px
Maximum dimension: 3840 px
Maximum dimension cannot be more than twice the minimum dimension
Recommended portrait ratio: 9:16
Recommended portrait size: at least 1080 x 1920 px
Recommended landscape ratio: 16:9
Recommended landscape size: at least 1920 x 1080 px
Maximum screenshots per supported device type: 8
```

## Visual Direction

BreakSignal should feel like:

```text
calm
minimal
premium
dark futuristic
focused
body-aware
professional
```

Avoid:

```text
medical guarantees
hospital/doctor imagery
panic/fear messaging
fake awards
ranking claims
Google Play badges inside screenshots
excessive text overlays
busy visuals
```

Do not use wording like:

```text
prevents eye damage
fixes posture
treats pain
cures focus problems
guarantees health benefits
best app
number one
download now
install now
```

## Recommended Screenshot Set

Create or document a final sequence of 5 phone screenshots.

Use portrait orientation.

The screenshots should show real app UI from the release-candidate Android build.

### Screenshot 1: Main Timer

Purpose:

```text
Show the core timer, next break type, progress bar, and main controls.
```

Suggested caption:

```text
Build a calmer break rhythm
```

Alt text:

```text
BreakSignal main timer screen showing countdown, next break type, and timer controls.
```

### Screenshot 2: Reminder Modal

Purpose:

```text
Show the break reminder modal with Done, Snooze, and Skip actions.
```

Suggested caption:

```text
Pause when your reset signal arrives
```

Alt text:

```text
BreakSignal reminder modal showing a break message with Done, Snooze, and Skip buttons.
```

### Screenshot 3: Break Type Selection

Purpose:

```text
Show eye, stretch, walking, posture, and focus-related break options.
```

Suggested caption:

```text
Choose reminders that fit your workday
```

Alt text:

```text
BreakSignal break type selection screen with eye, stretch, walking, and posture options.
```

### Screenshot 4: Settings And Themes

Purpose:

```text
Show cadence, alert tone, sound volume, presets, and visual theme controls.
```

Suggested caption:

```text
Tune the experience to your routine
```

Alt text:

```text
BreakSignal settings screen showing reminder cadence, sound, volume, and theme controls.
```

### Screenshot 5: Daily Stats And History

Purpose:

```text
Show daily completed breaks, break-type breakdown, streak, and recent activity.
```

Suggested caption:

```text
See your recent break rhythm
```

Alt text:

```text
BreakSignal stats and history screen showing daily break count and recent activity entries.
```

## Feature Graphic Plan

Create a feature graphic plan for:

```text
1024 x 500 px
```

Recommended concept:

```text
Dark futuristic background with the BreakSignal circular timer/signal mark, subtle pause bars, calm cyan/violet glow, and a clean app-preview composition.
```

Suggested text, if any:

```text
Protect your eyes, posture, and focus.
```

Keep text minimal.

Do not include:

```text
Google Play badge
fake phone model names
rankings
pricing claims
medical claims
large blocks of text
```

## Folder Structure

Create this folder only if visual assets or metadata files are actually added:

```text
play-store-assets/
├── screenshots/
├── feature-graphic/
└── metadata/
```

Recommended metadata file:

```text
play-store-assets/metadata/screenshot-captions.md
```

This file should include:

```text
screenshot order
screen name
caption
alt text
capture notes
whether the asset is captured or still pending
```

Do not add empty placeholder image files.

Only add image files if they are real generated or captured assets.

## Required Updates

Update these docs if needed:

```text
PLAY_STORE_SCREENSHOT_PLAN.md
CLOSED_TESTING_CHECKLIST.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
README.md
```

Keep changes documentation-focused.

## Screenshot Capture Checklist

Before marking screenshots as captured, confirm:

```text
The app is the release-candidate Android build.
The app icon is final.
The splash screen is final.
The UI shown matches the current app.
The Android browser-only UI is hidden.
The screenshots are portrait phone screenshots.
The screenshots are not blurry or stretched.
The status bar is clean.
No personal notifications are visible.
No unrelated apps or personal data are visible.
No medical guarantee wording appears.
No Google Play badge appears inside the image.
Captions are readable and do not overwhelm the screenshot.
```

## Testing Notes

Use Android Studio or the Test Android Apps plugin if available.

Recommended emulator/device:

```text
Pixel 8 or similar portrait phone emulator
```

Recommended test data:

```text
A short timer interval for capture
A few completed break history entries
A readable dark theme
Sound enabled but not visually intrusive
Browser notification controls hidden in Android
```

## What Not To Do

Do not generate a signed AAB.

Do not create an upload keystore.

Do not modify signing configuration.

Do not change app permissions.

Do not add analytics, ads, crash reporting, Firebase, accounts, or external APIs.

Do not claim screenshots are final unless real screenshot files exist and are reviewed.

Do not mark closed testing complete.

## Validation Checklist

After the step, verify:

```text
Only documentation and optional play-store-assets files changed.
No Android source or Gradle files changed.
No package files changed.
No .apk, .aab, .jks, .keystore, key.properties, local.properties, or google-services.json files are tracked.
Screenshot plan still avoids medical claims.
Feature graphic plan follows 1024 x 500 px requirement.
Screenshot captions and alt text are documented.
Remaining manual work is clearly listed.
```

## Final Codex Summary

When finished, summarize:

```text
Files changed
Whether screenshots were captured or only planned
Whether a feature graphic was created or only planned
Screenshot captions added
Alt text added
Remaining manual visual asset work
Confirmation that no Android source, Gradle, package, or release artifact files changed
```
