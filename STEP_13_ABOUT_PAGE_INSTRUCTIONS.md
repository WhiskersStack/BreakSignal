# Step 13: About Page Instructions

## Branch

Work from the latest validated branch:

```bash
git checkout 12_AudioDurationValidation_AndroidSync
git pull
git checkout -b 13_AboutPage
```

## Goal

Add a polished About page to BreakSignal.

The page should explain what BreakSignal is and why regular breaks are useful for eyes, posture, movement, and focus.

This should make the project feel more complete, professional, and portfolio-ready.

## Confirmed User Requirements

Create a separate About page:

```text
www/about.html
```

Add an About link to the web app navigation/footer.

Sync the updated web app into Android with Capacitor.

Keep the page clean and cautious. Do not add a large references section.

## Hard Rules

Use only:

```text
HTML
CSS
Vanilla JavaScript if needed
```

Do not add:

```text
React
Node app logic
Backend services
Databases
External APIs
External libraries
Build tools
Analytics
Tracking
Medical claims
```

Do not change Android native source manually.

Do not change Gradle files manually.

Do not change Capacitor config unless absolutely required.

Do not change package files unless absolutely required.

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

## Files To Review First

Review these files before editing:

```text
www/index.html
www/privacy.html
www/style.css
www/script.js
www/service-worker.js
sitemap.xml
README.md
capacitor.config.json
package.json
```

Use existing style patterns from `www/index.html`, `www/privacy.html`, and `www/style.css`.

## Files To Create Or Update

Expected files:

```text
www/about.html
www/index.html
www/style.css
www/service-worker.js
sitemap.xml
README.md
```

After Android sync, generated Android web asset files may also change under:

```text
android/app/src/main/assets/public/
```

Only accept Android generated asset changes if they are produced by `npm run android:sync` and reflect the updated `www` files.

## About Page Content Requirements

Create `www/about.html` as a full standalone static HTML page.

It should match the visual identity of BreakSignal:

```text
Minimal
Clean
Dark futuristic
Professional
Calm productivity command center
Glass-like cards
Soft borders
Subtle gradients
Responsive
```

Use the page title:

```text
About BreakSignal
```

Recommended headline:

```text
Small breaks. Cleaner focus. Better working rhythm.
```

Recommended intro:

```text
BreakSignal is a calm break reminder for people who spend long periods working at a computer. It helps you create a steady rhythm of eye breaks, posture resets, stretching, and short movement breaks without adding noise to your workflow.
```

## Required Sections

Include these sections.

### 1. What BreakSignal Is

Explain that BreakSignal is a simple static web app and Android app for healthy break reminders.

Mention:

```text
Eye breaks
Stretch breaks
Walking breaks
Posture reminders
Custom timing
Local settings
No account required
```

### 2. Why Breaks Matter

Explain carefully that regular breaks can help users interrupt long static work sessions.

Use cautious wording:

```text
Regular pauses can help you notice eye strain, posture tension, stiffness, and mental fatigue before they build up.
```

Avoid medical certainty.

### 3. Eye Breaks

Explain:

```text
Screens keep attention locked at a close distance.
Looking away gives your eyes a chance to relax from constant near focus.
```

Safe wording:

```text
BreakSignal reminds you to look away, blink, and soften your focus.
```

Do not claim that the app prevents eye disease or protects vision permanently.

### 4. Posture Resets

Explain:

```text
Long desk sessions can make it easy to drift into tense shoulders, forward neck posture, or uneven sitting.
```

Safe wording:

```text
BreakSignal gives small prompts to relax your shoulders, align your neck, and return both feet to the floor.
```

Do not claim that the app fixes posture or treats pain.

### 5. Stretching And Movement

Explain:

```text
Short standing, stretching, and walking breaks can help interrupt long periods of stillness.
```

Mention that BreakSignal supports stretch and walking reminders.

### 6. Focus Recovery

Explain:

```text
Breaks are not only physical. A short pause can help mark the end of one focus block and prepare the mind for the next.
```

Keep it productivity-focused, not medical.

### 7. Privacy-First Design

Mention:

```text
No account required.
No backend database.
No analytics.
No external API required for core timer behavior.
Settings and history are stored locally on the device/browser.
```

Link to:

```text
privacy.html
```

### 8. Important Note

Include a clear non-medical disclaimer:

```text
BreakSignal is a productivity and wellness reminder tool. It is not medical advice, diagnosis, or treatment. If you have pain, vision problems, or health concerns, consider speaking with a qualified professional.
```

## Wording Rules

Avoid claims like:

```text
Prevents eye damage
Fixes posture
Treats pain
Cures focus problems
Protects your health guaranteed
Medically proven
Doctor recommended
```

Use safer terms:

```text
May help
Can remind you
Supports a healthier rhythm
Encourages regular pauses
Helps you notice tension
Designed to support focus and body awareness
```

## Navigation Requirements

Add an About link to the main app navigation if there is a suitable nav area.

Add an About link to the footer.

Recommended footer order:

```text
Timer
Settings
About
Privacy Policy
FAQ
GitHub
```

Keep the footer one clean row on desktop.

Do not reintroduce the duplicate `Privacy` link.

Keep only:

```text
Privacy Policy
```

## About Page Links

The About page should include navigation back to:

```text
index.html
privacy.html
```

Recommended links:

```text
Open BreakSignal
Privacy Policy
GitHub
```

Use relative links for internal pages:

```text
./index.html
./privacy.html
```

## Styling Requirements

Use existing styles where possible.

If adding new CSS, keep it small and consistent.

Potential CSS class names:

```text
.about-page
.about-hero
.about-grid
.about-card
.about-note
```

The page should be responsive.

Test desktop and mobile widths.

No horizontal overflow.

## Service Worker Update

If `www/service-worker.js` precaches app shell/static pages, add:

```text
/about.html
```

or the project’s matching path style.

Do not change service worker behavior beyond adding the About page to the static cache/app shell if appropriate.

Make sure privacy-page caching behavior remains intact.

## Sitemap Update

Update `sitemap.xml` to include:

```text
https://www.break-signal.com/about.html
```

Use consistent formatting with the existing sitemap entries.

## README Update

Add the About page to the appropriate section in `README.md`.

Keep it brief.

Example:

```md
- About page: `www/about.html`
```

or mention it as part of the app pages:

```md
The app includes a timer dashboard, privacy policy page, and About page.
```

## Android Sync

After web changes are complete, run:

```bash
npm run android:sync
```

This syncs the updated `www` static web app into the Capacitor Android project.

Do not manually edit Android native files.

Expected generated Android asset changes may appear under:

```text
android/app/src/main/assets/public/
```

## Browser Test Checklist

Test locally:

```text
Open www/index.html.
Confirm About link appears in the footer/navigation.
Click About.
Confirm about.html opens.
Confirm styling matches BreakSignal.
Confirm Open BreakSignal link returns to index.html.
Confirm Privacy Policy link opens privacy.html.
Confirm footer remains one row on desktop.
Confirm footer does not overflow on mobile.
Confirm no duplicate Privacy link exists.
Confirm no console errors.
```

## Android Test Checklist

After `npm run android:sync`, test in Android Studio if possible:

```text
Open android/ in Android Studio.
Let Gradle sync finish.
Build and install the debug app.
Open BreakSignal.
Open the About page link.
Confirm about.html displays correctly inside Android.
Confirm back navigation works.
Confirm Privacy Policy link works.
Confirm timer still works.
Confirm Break signal duration setting still works.
```

The debug build is for local verification only. Do not upload debug APK/AAB to Google Play.

## Validation Commands

Run:

```bash
node --check .\www\script.js
git status --short
git diff --name-only
git diff --check
git ls-files | grep -E "(\.apk$|\.aab$|\.jks$|\.keystore$|key\.properties$|local\.properties$|google-services\.json$)"
```

Expected artifact scan:

```text
no output
```

## Expected Changed Files

Expected web files may include:

```text
www/about.html
www/index.html
www/style.css
www/service-worker.js
sitemap.xml
README.md
```

Expected Android sync output may include:

```text
android/app/src/main/assets/public/about.html
android/app/src/main/assets/public/index.html
android/app/src/main/assets/public/style.css
android/app/src/main/assets/public/service-worker.js
```

Exact Android generated files may vary based on Capacitor sync behavior.

## Final Codex Summary

When finished, summarize:

```text
Files changed
About page created: yes/no
About link added to footer/navigation: yes/no
Footer remains one row on desktop: yes/no
Duplicate Privacy link avoided: yes/no
Medical claims avoided: yes/no
Privacy-first section included: yes/no
Non-medical disclaimer included: yes/no
Service worker updated: yes/no/not applicable
Sitemap updated: yes/no
README updated: yes/no
Android sync run: yes/no
Android files changed by sync:
Browser test results
Android test results
Validation command results
Artifact scan result
Confirmation that no Android native source, Gradle, Capacitor config, package, release artifact, or signing files changed unexpectedly
```
