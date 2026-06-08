# Step 4: Play Store Visual Assets Instructions

## Branch

Work from the completed Step 3 branch:

```text
3_PlayStorePrep_Screenshots
```

Create a new branch for this work:

```bash
git checkout 3_PlayStorePrep_Screenshots
git pull
git checkout -b 4_PlayStorePrep_VisualAssets
```

## Goal

Create or capture the real Play Store visual assets for BreakSignal using the release-candidate Android app.

This step should produce real visual assets, not placeholder files.

The main outputs are:

```text
Phone screenshots
Feature graphic
Updated screenshot metadata
Updated Play Store documentation
```

## Hard Rules

Do not change app behavior.

Do not change Android source code.

Do not change Gradle files.

Do not change Capacitor configuration.

Do not change package files.

Do not create signing files.

Do not create or commit APKs or AABs.

Do not commit placeholder image files.

Do not add dependencies unless explicitly approved first.

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

## Visual Direction

The assets should feel:

```text
minimal
clean
dark futuristic
calm
premium
focused
body-aware
professional
```

Avoid:

```text
medical claims
fear-based messaging
panic language
fake awards
ranking claims
Google Play badges inside graphics
busy text overlays
personal notifications
unrelated apps
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
install now
download now
```

## Play Store Asset Requirements To Follow

Before final upload, verify current requirements directly in Google Play Console.

Use these planning requirements:

### App Icon

```text
Size: 512 x 512 px
Format: 32-bit PNG with alpha
Maximum file size: 1024 KB
```

The Android launcher icon already exists in the project. For Play Console, export or prepare a matching 512 x 512 PNG only if needed.

### Feature Graphic

```text
Size: 1024 x 500 px
Format: JPEG or 24-bit PNG
Alpha: no alpha channel
```

### Phone Screenshots

```text
Minimum required: 2 screenshots across supported device types
Recommended: at least 4 screenshots
Planned for BreakSignal: 5 phone screenshots
Maximum screenshots per supported device type: 8
Format: JPEG or 24-bit PNG
Alpha: no alpha channel
Minimum dimension: 320 px
Maximum dimension: 3840 px
Maximum dimension cannot be more than twice the minimum dimension
Recommended portrait ratio: 9:16
Recommended portrait size: at least 1080 x 1920 px
```

## Output Folder Structure

Use this structure:

```text
play-store-assets/
├── screenshots/
│   ├── phone-01-main-timer.png
│   ├── phone-02-reminder-modal.png
│   ├── phone-03-break-types.png
│   ├── phone-04-settings-themes.png
│   └── phone-05-stats-history.png
├── feature-graphic/
│   └── breaksignal-feature-graphic.png
└── metadata/
    └── screenshot-captions.md
```

Only add image files if they are real captured or created assets.

Do not add empty placeholder files.

## Screenshot Capture Preparation

Use the release-candidate Android app.

Recommended capture environment:

```text
Android Studio emulator or real Android device
Portrait orientation
Pixel 8 or similar phone profile
Clean status bar
No personal notifications
No unrelated apps visible
Dark BreakSignal theme preferred
```

Before capturing, confirm:

```text
App launches correctly
App icon appears correctly
Splash screen appears correctly
Browser-only install UI is hidden
Browser notification control is hidden in Android
SEO/footer website-only sections are hidden in Android
No horizontal overflow
No clipped text
No crash logs during normal use
```

## Required Phone Screenshots

Capture 5 phone screenshots.

### 1. Main Timer

File name:

```text
play-store-assets/screenshots/phone-01-main-timer.png
```

Show:

```text
Main countdown timer
Status badge
Next break type
Progress bar
Start / Pause / Reset / Test Reminder controls if visible cleanly
```

Caption:

```text
Build a calmer break rhythm
```

Alt text:

```text
BreakSignal main timer screen showing countdown, next break type, and timer controls.
```

### 2. Reminder Modal

File name:

```text
play-store-assets/screenshots/phone-02-reminder-modal.png
```

Show:

```text
Break reminder modal
Break message
Suggested duration
Done / Snooze / Skip buttons
```

Caption:

```text
Pause when your reset signal arrives
```

Alt text:

```text
BreakSignal reminder modal showing a break message with Done, Snooze, and Skip buttons.
```

### 3. Break Type Selection

File name:

```text
play-store-assets/screenshots/phone-03-break-types.png
```

Show:

```text
Eye Break
Stretch Break
Walking Break
Posture Break
Clear selection controls
Comfortable spacing
```

Caption:

```text
Choose reminders that fit your workday
```

Alt text:

```text
BreakSignal break type selection screen with eye, stretch, walking, and posture options.
```

### 4. Settings And Themes

File name:

```text
play-store-assets/screenshots/phone-04-settings-themes.png
```

Show:

```text
Presets
Reminder interval
Snooze duration
Theme selector
Sound alert controls
Alert tone selector
Volume control
```

Caption:

```text
Tune the experience to your routine
```

Alt text:

```text
BreakSignal settings screen showing reminder cadence, sound, volume, and theme controls.
```

### 5. Daily Stats And History

File name:

```text
play-store-assets/screenshots/phone-05-stats-history.png
```

Show:

```text
Daily break count
Break type breakdown
Focus rhythm/streak if visible
Recent break history
Clear history control if visible cleanly
```

Caption:

```text
See your recent break rhythm
```

Alt text:

```text
BreakSignal stats and history screen showing daily break count and recent activity entries.
```

## Feature Graphic

Create:

```text
play-store-assets/feature-graphic/breaksignal-feature-graphic.png
```

Required size:

```text
1024 x 500 px
```

Required format:

```text
24-bit PNG or JPEG
No alpha channel
```

Recommended concept:

```text
Dark futuristic background
BreakSignal circular signal/timer mark
Subtle pause bars
Cyan/violet glow
Clean premium app-preview composition
Minimal text
```

Allowed text:

```text
Protect your eyes, posture, and focus.
```

Do not include:

```text
Google Play badge
fake awards
pricing claims
ranking claims
medical claims
large text blocks
personal information
```

## Metadata Updates

Update:

```text
play-store-assets/metadata/screenshot-captions.md
```

For each screenshot, update status from:

```text
Pending capture
```

to:

```text
Captured
```

only after the real screenshot file exists and has been reviewed.

Add the actual file path for each captured screenshot.

Also add the feature graphic file path if the feature graphic is created.

## Documentation Updates

Update these files as needed:

```text
PLAY_STORE_SCREENSHOT_PLAN.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
CLOSED_TESTING_CHECKLIST.md
README.md
```

Keep updates factual.

Do not mark final screenshots or feature graphic complete unless the actual image files exist.

If screenshots are still not captured, leave them as pending.

If the feature graphic is still not created, leave it as pending.

## Image Quality Checklist

For each screenshot, confirm:

```text
Portrait phone screenshot
Real release-candidate Android app UI
No browser-only Android-hidden UI appears
No personal notifications
No unrelated app content
No medical guarantee wording
No Google Play badge
No clipped controls
No horizontal overflow
Readable text at store-preview size
No blur or stretching
File name follows the planned naming scheme
```

For the feature graphic, confirm:

```text
1024 x 500 px
No alpha channel
Clean dark futuristic composition
Readable at small preview size
No forbidden claims or badges
Matches BreakSignal branding
```

## Validation Commands

Run:

```bash
git status --short
git diff --name-only
```

Expected changed paths may include:

```text
play-store-assets/screenshots/
play-store-assets/feature-graphic/
play-store-assets/metadata/screenshot-captions.md
PLAY_STORE_SCREENSHOT_PLAN.md
PLAY_STORE_PREPARATION_INSTRUCTIONS.md
CLOSED_TESTING_CHECKLIST.md
README.md
```

Unexpected changes:

```text
android/app/build.gradle
android/build.gradle
android/gradle/wrapper/gradle-wrapper.properties
android/app/src/main/java/
capacitor.config.json
package.json
package-lock.json
www/script.js
www/style.css
www/index.html
```

Do not keep unexpected changes unless explicitly approved.

## Artifact Safety Check

Before committing, verify no release artifacts or secrets are tracked:

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
Screenshots captured: yes/no
Screenshot file paths, if captured
Feature graphic created: yes/no
Feature graphic file path, if created
Metadata statuses updated
Remaining manual visual work
Validation results
Confirmation that no Android source, Gradle, package, signing, APK, or AAB files changed
```
