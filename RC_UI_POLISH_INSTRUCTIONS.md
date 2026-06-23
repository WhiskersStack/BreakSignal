# BreakSignal RC UI Polish Instructions

## Context

You are working on **BreakSignal**.

Project phase:

```text
Release-candidate QA / Play Store closed testing preparation
```

This is a **release-candidate bugfix pass**, not new feature development.

The project is currently feature-frozen. The web app and Android app are working. Current RC findings were discovered during manual Android/UI testing.

---

## Hard Rules

Do not add new features.

Do not change timer logic.

Do not change break reminder behavior.

Do not change audio duration logic unless directly affected by navigation/UI.

Do not add React, Node.js app logic, backend services, databases, APIs, external libraries, or build tools to the core web app.

Keep the core web app plain:

```text
HTML
CSS
Vanilla JavaScript
```

Do not create, modify, or commit:

```text
.apk
.aab
.jks
.keystore
key.properties
local.properties
google-services.json
passwords
signing aliases
personal paths
tester personal data
```

Do not create a keystore.

Do not generate a signed AAB.

Do not perform Play Console upload steps.

---

## Branch

Create a small RC bugfix branch:

```bash
git checkout main
git pull origin main
git checkout -b rc-ui-polish-footer-privacy-navigation
```

---

# Goal

Fix three confirmed release-candidate UI/UX issues:

```text
1. Remove the footer tech/AWS sentence completely.
2. Make the Privacy Policy page visually match the About/FAQ pages.
3. Fix Android secondary-page back behavior so Back returns directly to the main timer page.
```

---

# Fix 1 — Remove Footer Tech/AWS Text

## Problem

The app footer currently includes portfolio/demo text similar to:

```text
Built with HTML, CSS, and JavaScript. Designed for AWS S3 static hosting.
```

This should not appear inside the product UI.

It is acceptable for README/project documentation, but not for the live app or Android app.

## Required Change

Remove this text completely from the app UI.

It should be removed from both:

```text
Web app
Android app packaged web assets
```

## Desired Footer Direction

Keep the footer clean and product-like.

Footer navigation should remain:

```text
Timer
Settings
About
Privacy Policy
FAQ
GitHub
```

Do not add replacement tech-stack text.

Do not add AWS hosting text.

Do not add portfolio explanation text.

---

# Fix 2 — Restyle Privacy Policy Page

## Problem

The Privacy Policy page currently does not visually match the About and FAQ pages.

It feels like a disconnected legal page instead of a native BreakSignal page.

## Required Change

Refactor the Privacy Policy page UI so it matches the same visual language as the About/FAQ pages.

Use the same design pattern as the existing polished pages:

```text
BreakSignal logo/icon
Small eyebrow label
Large page title
Short intro text
Glass-style content cards
Matching spacing
Matching typography
Matching button style
Matching mobile layout
Matching dark/futuristic style
```

The Privacy Policy page should feel like part of the same calm productivity command center.

## Important

Do not remove required privacy information.

The Privacy Policy page must still clearly include:

```text
App name: BreakSignal
Developer: WhiskersStack
Support email: support@break-signal.com
Effective date: June 6, 2026
Settings/history stored locally on the user's device
No account required
No backend database
No selling user data
Browser/Android notification permission is optional
Local data can be cleared through app/browser controls
Android app uses the same static app wrapped through Capacitor
```

Use careful language.

Do not make medical claims.

Do not overclaim privacy.

Do not claim things that are not technically true.

---

# Fix 3 — Android Secondary Page Back Behavior

## Problem

Inside the Android app, secondary pages behave too much like browser history.

Current bad behavior example:

```text
Main → About → FAQ → Privacy
Back → FAQ
Back → About
Back → Main
```

This feels like a browser, not a mobile app.

## Desired Android Behavior

From any secondary page, pressing Android Back should return directly to the main BreakSignal timer page.

Expected behavior:

```text
Main → About
Back → Main

Main → FAQ
Back → Main

Main → Privacy Policy
Back → Main

Main → About → FAQ → Privacy Policy
Back → Main
```

## Scope

Secondary pages are:

```text
about.html
faq.html
privacy.html
```

Main page is:

```text
index.html
```

## Preferred Implementation Direction

Keep the project simple.

Do not convert the app into a SPA.

Do not add a routing library.

Do not add dependencies.

Recommended simple approach:

```text
When running inside Capacitor/Android:
- Navigation from one secondary page to another should replace the current history entry instead of stacking pages.
- Android Back from any secondary page should return directly to index.html.
```

Use the existing Capacitor/app environment detection if present.

If there is already Android-specific navigation logic, extend it carefully.

If needed, use plain JavaScript only.

Possible behavior pattern:

```js
// Concept only. Adapt to existing project style.
const isSecondaryPage =
  location.pathname.endsWith('/about.html') ||
  location.pathname.endsWith('/faq.html') ||
  location.pathname.endsWith('/privacy.html');

const isAndroidApp =
  document.documentElement.classList.contains('capacitor') ||
  navigator.userAgent.includes('wv') ||
  window.Capacitor;

if (isAndroidApp && isSecondaryPage) {
  window.addEventListener('popstate', () => {
    window.location.replace('./index.html');
  });
}
```

Do not copy this blindly if the project already has a cleaner pattern.

Use the simplest reliable implementation that fits the current codebase.

## Important Web Behavior

Normal browser behavior on the web is acceptable.

Do not break standard browser navigation for desktop/web users.

The main target is Android app UX.

---

# Files Likely Involved

Check and edit only what is necessary:

```text
www/index.html
www/about.html
www/faq.html
www/privacy.html
www/style.css
www/script.js
www/service-worker.js
```

Only touch Android files if required after Capacitor sync.

Do not edit unrelated files.

---

# Service Worker / Cache

If cached HTML/CSS/JS assets change, bump the service worker cache version.

Current known cache version may be:

```text
breaksignal-v1.0.8
```

If still present, bump to:

```text
breaksignal-v1.0.9
```

Do not rewrite the service worker.

Do not change caching strategy unless directly required.

The service worker must not cause page mix-ups.

Avoid bugs where:

```text
Home shows Privacy content
Privacy shows Home content
About/FAQ fail after cache update
Old UI keeps returning after refresh
```

---

# Android Sync

After web asset changes, run:

```bash
npm run android:sync
```

Then verify that the updated files are synced into the Android project.

---

# Acceptance Criteria

The fix is complete only when all of these pass:

## Footer

```text
The "Built with HTML, CSS, and JavaScript..." text is gone.
The AWS S3 hosting sentence is gone.
Footer navigation still works.
Footer looks clean on mobile.
Footer looks clean on desktop.
```

## Privacy Page

```text
Privacy Policy page visually matches About/FAQ.
Privacy content remains accurate.
No required privacy details are removed.
Page uses BreakSignal branding.
Page spacing and buttons match the rest of the app.
Theme applies correctly before paint.
No default-theme flash appears.
```

## Android Navigation

```text
Main → About → Back returns to Main.
Main → FAQ → Back returns to Main.
Main → Privacy → Back returns to Main.
Main → About → FAQ → Privacy → Back returns directly to Main.
Back behavior does not cycle through every secondary page.
Timer page still behaves normally.
No broken links.
```

## Regression Safety

```text
Timer still starts.
Timer still pauses.
Timer still resets.
Test Reminder still works.
Done / Snooze / Skip still work.
Break signal audio still works.
Theme persistence still works.
About page still opens.
FAQ page still opens.
Privacy Policy page still opens.
No new dependencies added.
No signed Android artifacts created.
No secrets committed.
```

---

# Manual Test Plan

After changes, test in this order.

## 1. Web Test

Open the web app and verify:

```text
Home loads
Footer text is removed
Footer links work
About page opens
FAQ page opens
Privacy Policy page opens
Privacy page matches visual style
Theme persists across pages
No console errors
```

## 2. Android Debug Test

Open Android Studio and test the debug app only.

Verify:

```text
App opens cleanly
Footer text is removed
About opens
FAQ opens
Privacy Policy opens
Privacy page matches style
Android Back from About returns to Main
Android Back from FAQ returns to Main
Android Back from Privacy returns to Main
Android Back after visiting multiple pages returns to Main
No theme flash
No broken navigation
```

## 3. Git Safety Check

Before commit:

```bash
git status
git diff
```

Confirm no forbidden files are present.

---

# Commit Message

Use:

```bash
git add .
git commit -m "Fix RC footer privacy page and Android back navigation"
```

Push branch:

```bash
git push -u origin rc-ui-polish-footer-privacy-navigation
```

---

# Do Not Mark RC GO Yet

After this fix, the project still needs another manual RC QA pass.

Do not proceed to:

```text
Upload keystore
Signed AAB
Play Console upload
Closed testing release
```

until the release-candidate checklist reaches:

```text
GO
```
