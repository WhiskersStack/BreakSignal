# BreakSignal Project Instructions

These instructions apply only when working on the BreakSignal project.

## Project references

Live site:

* https://www.break-signal.com/

GitHub repository:

* https://github.com/WhiskersStack/BreakSignal

## Project identity

BreakSignal is a simple static web app and Android app for healthy break reminders.

Tagline:

Protect your eyes, posture, and focus.

Main goal:

Build and polish BreakSignal as a professional portfolio project.

The core web app should be ready for AWS S3 static website hosting.

The Android app should be built from the existing web app using Capacitor.

## Core identity

BreakSignal should feel like a calm productivity command center.

It should protect the user’s eyes, posture, body, and focus while working at a computer.

The app should feel:

* Calm
* Focused
* Modern
* Premium
* Body-aware
* Reliable
* Professional

## Current project phase

BreakSignal is in release-candidate review and Play Store closed testing preparation.

Feature work is frozen unless a change is clearly necessary for:

* Release quality
* Correctness
* Privacy readiness
* Android behavior
* Play Store closed testing readiness
* Serious UX problems
* Broken navigation
* Broken timer behavior
* Service worker or caching issues
* Mobile usability problems

Do not suggest or add new features unless they are clearly necessary for release readiness.

## Core technical rules

The core web app must remain plain:

* HTML
* CSS
* Vanilla JavaScript

Do not use for the core web app:

* React
* Node.js runtime
* Vite
* Frameworks
* Backend services
* Databases
* External libraries
* External APIs
* Web build tools

Preserve the simple static structure.

Do not convert the project into a framework project.

## Android exception

Capacitor, npm, package.json, capacitor config files, Android Studio files, and the android/ folder are allowed only for the Android app layer.

They must not be used to turn the core web app into a framework-based app.

## Source of truth

BreakSignal web app = the heart.

Capacitor Android app = the shell.

Android Studio = the forge for APK/AAB builds.

AWS S3 = the static hosting target for the web version.

The web app remains the source of truth.

Do not rebuild the app from scratch.

## Design direction

The app should be:

* Minimal
* Clean
* Dark
* Futuristic
* Professional
* Premium
* Calm
* Body-aware
* Mobile-friendly

## Visual style

Use:

* Dark background
* Subtle gradients
* Glass-style cards
* Soft borders
* Clean typography
* Smooth transitions
* Strong spacing
* Accessible contrast
* Professional layout
* Calm visual rhythm

Avoid:

* Childish timer design
* Loud colors
* Overly playful UI
* Visual clutter
* Over-engineering
* Random visual experiments

## Branding

The app name is BreakSignal.

The logo concept is a circular signal/timer icon with subtle pause bars in the center.

The brand should feel calm, focused, modern, premium, and body-aware.

## Core web app features

Preserve and maintain these features:

* Fixed interval break timer
* Countdown display
* Start button
* Pause button
* Reset button
* Snooze option
* Skip option
* Break reminder modal
* Eye break reminders
* Stretch break reminders
* Walking break reminders
* Posture break reminders
* Break type selection
* Custom break messages
* Sound alert using Web Audio API
* Browser notifications
* Daily break counter
* Break history log
* Clear history option
* Save settings with localStorage
* Save history with localStorage
* Responsive mobile layout

Do not remove existing features unless explicitly asked.

## Important app behavior

The timer only needs to work while the browser tab or Android app is open.

The timer does not need to continue running after the browser, tab, or app is closed.

When reopened, saved settings and history should load from localStorage.

The timer itself does not need to resume after closing.

Keep the app simple and reliable.

If notifications, sound, or storage are unsupported in a browser or WebView, the app should fail gracefully and continue working.

## Default break types and messages

Eye Break:

Look at something far away for 20 seconds. Let your eyes soften.

Stretch Break:

Stand up, open your chest, roll your shoulders, and breathe.

Walking Break:

Take a short walk. Let your body reset before returning.

Posture Break:

Relax your shoulders, align your neck, and place both feet on the floor.

## Web app coding style

Write clean, readable, beginner-friendly code.

Use:

* Clear function names
* Helpful comments where useful
* Semantic HTML
* Organized CSS sections
* Readable JavaScript
* Small, targeted changes
* Simple logic

Avoid:

* Unnecessary complexity
* Large rewrites
* New dependencies
* Clever code
* Unrelated refactors
* Changing architecture without approval

## Before editing BreakSignal

Before changing files:

1. Inspect the current file structure.
2. Read the relevant HTML, CSS, and JavaScript files.

   The core web app files are inside the `www/` folder:

   - `www/index.html`
   - `www/style.css`
   - `www/script.js`

   Treat these as the main web app files unless the repository structure clearly shows otherwise.
3. Understand the current behavior.
4. Check whether Capacitor and android/ already exist before touching Android-related work.
5. Identify bugs, missing release-readiness items, weak UX, or mobile issues.
6. Make targeted improvements only.
7. Do not delete existing Android work.
8. Avoid destructive changes unless explicitly approved.

## Web app testing checklist

After web changes, verify:

* Timer starts correctly
* Timer pauses correctly
* Timer resets correctly
* Snooze works
* Skip works
* Modal opens at break time
* Modal can be closed
* Break messages display correctly
* Daily counter updates correctly
* Break history updates correctly
* Clear history works
* Settings persist after refresh
* History persists after refresh
* Notification permission flow does not break the app
* Sound works after user interaction
* Layout works on desktop
* Layout works on mobile
* No console errors

## UX improvements to prioritize during release-candidate work

Prioritize only release-quality polish, such as:

* Clear timer states: idle, running, paused, break active
* Better empty state for break history
* Better disabled button states
* Better notification permission explanation
* More polished modal
* Smoother transitions
* Stronger mobile spacing
* Better footer
* Better settings layout
* Better touch targets
* Professional portfolio-level polish

Do not treat this list as permission to add unrelated new features.

## Footer requirement

The app should include a simple professional footer.

Footer should include:

BreakSignal — Protect your eyes, posture, and focus.

Built with HTML, CSS, and JavaScript. Designed for AWS S3 static hosting.

Optional footer additions:

* GitHub link
* Static website hosting note
* Portfolio project note

## AWS readiness

The web app should remain suitable for direct upload to an S3 static website bucket.

The final web output should work with:

* index.html
* style.css
* script.js
* static assets if needed

Do not require:

* Build commands
* npm install for the web version
* Server runtime
* Backend services
* Database setup

Optional future AWS upgrade notes may mention:

* CloudFront
* Origin Access Control
* Route 53
* HTTPS
* Terraform

Do not implement these unless explicitly asked.

## Android app phase

The Android version has already been started.

The Android app should be based on the existing BreakSignal web app.

Preferred Android approach:

Use Capacitor to wrap the existing HTML, CSS, and JavaScript app into an Android app.

## Android rules

Keep the web app as the source of truth.

Do not:

* Convert the project to React
* Rewrite the app natively in Kotlin or Java unless explicitly asked
* Add a backend
* Add external APIs
* Add Firebase unless explicitly asked
* Add analytics unless explicitly asked
* Over-engineer the Android app
* Delete existing Android work

## Android tooling

Allowed for Android phase:

* Capacitor
* npm
* package.json
* capacitor config files
* Android Studio
* android/ project folder
* Gradle only when needed for Android builds

Use Android Studio only for:

* Opening the Android project
* Testing on emulator or real device
* Building APK or AAB
* Later Play Store preparation

## Android goals

The Android app should:

* Be a clean Android version of BreakSignal
* Be suitable for testing on a real Android phone
* Eventually be suitable for Google Play Store release
* Stay simple, polished, and portfolio-ready
* Keep the same visual identity as the web version
* Work without internet access for core timer behavior

## Android expected behavior

Verify that:

* Timer works while the app is open
* Start, pause, reset, snooze, and skip work
* Break modal works on phone screens
* Saved settings persist using localStorage
* Break history persists using localStorage
* Sound alert works after user interaction
* Notifications are handled carefully and do not crash the app
* Layout feels good on Android phone screens
* Buttons are large enough for touch
* Core timer behavior does not depend on internet access

## Android testing checklist

After Android changes, verify:

* Web app still runs normally
* Capacitor sync works if sync was required
* Android project opens in Android Studio
* App runs on emulator or real device
* Timer works
* Start, pause, reset work
* Snooze and skip work
* Modal works
* localStorage persists
* Sound works
* Notifications do not crash the app
* Mobile layout looks clean
* No obvious Android console/runtime errors

## iOS strategy

iOS is a future phase, not the current priority.

Do not add iOS files unless explicitly asked.

When iOS is requested later:

* Use Capacitor
* Keep the same web app as the source of truth
* Use Xcode for iOS build/testing
* Do not rebuild the app in Swift
* Do not add iOS complexity unless needed

## Do not add unless explicitly requested

Do not add or configure these unless explicitly asked:

* iOS project
* Xcode project files
* App Store setup
* Play Store signing setup
* Keystore files
* Release signing config
* Firebase
* Push notification server
* Background timer service
* Native database
* User accounts
* Analytics
* Backend services
* External APIs
* New framework tooling

Do not add new service worker complexity unless it is required to maintain or fix existing app-shell, offline, navigation, or caching behavior.

## Mobile-ready requirements

The app should have:

* Fully responsive layout
* Comfortable touch targets
* Good mobile spacing
* No tiny buttons
* No hover-only interactions
* Modal that works well on small screens
* Readable timer on phones
* Settings that are easy to use on mobile
* localStorage that works normally
* Notifications and sound that fail gracefully if unsupported

## Release-candidate priority order

When reviewing BreakSignal, prioritize:

1. Broken core timer behavior
2. Broken Android behavior
3. Broken navigation
4. Privacy, About, FAQ, and footer correctness
5. Service worker and cache issues
6. Mobile layout and touch issues
7. Console/runtime errors
8. Accessibility basics
9. Visual polish
10. Documentation or testing notes

Do not prioritize new feature ideas during release-candidate review.

## Play Store preparation boundaries

Closed testing preparation is allowed.

Do not create or modify:

* Keystore files
* Signing passwords
* Play Store credentials
* Google service account keys
* Release publishing configuration

Do not build signed release artifacts or start Play Console upload steps unless explicitly approved.

Allowed release command only when preparing Play Store upload and explicitly approved:

android\gradlew.bat -p android :app:bundleRelease --console=plain

Allowed Android debug build command when needed and approved:

android\gradlew.bat -p android :app:assembleDebug --console=plain

## Expected response after edits

After making edits, always summarize:

1. What changed
2. Which files changed
3. How to test the web version
4. How to test the Android version, if Android files were changed
5. Any known limitations
6. Recommended next step

Do not commit unless explicitly asked.

Do not push unless explicitly asked.