# BreakSignal Upgrade Instructions

## Project Name

BreakSignal

## Tagline

Protect your eyes, posture, and focus.

## Project Goal

Upgrade BreakSignal from a working static web app into a polished portfolio project.

The app should feel like a calm productivity command center: minimal, dark, futuristic, clean, professional, and focused.

The main goal is to improve:

- Code readability
- GitHub presentation
- User experience
- Visual polish
- AWS portfolio value

---

# Technical Rules

The project must stay simple and static.

Use only:

- HTML
- CSS
- Vanilla JavaScript

Do not use:

- React
- Node.js
- npm
- Backend services
- Databases
- External libraries
- External APIs
- Build tools

The project should remain ready for AWS S3 static website hosting.

The app only needs to work while the browser tab is open.

Settings and history should persist with localStorage.

The timer does not need to continue running after the tab or browser is closed.

---

# Priority 1: Improve GitHub Presentation

Create or improve the README.md file.

The README should make the project look like a serious portfolio project.

It should include:

- Project title
- Short description
- Live demo link
- Screenshot section
- Features list
- Tech stack
- How the app works
- localStorage explanation
- Browser Notifications API explanation
- Web Audio API explanation
- AWS S3 deployment explanation
- Future AWS upgrade path
- Project structure
- What was learned

Suggested README intro:

```markdown
# BreakSignal

BreakSignal is a minimal static web app that helps users protect their eyes, posture, and focus by reminding them to take healthy breaks while working at a computer.

The app runs entirely in the browser using plain HTML, CSS, and JavaScript. It saves settings and break history with localStorage and is designed for deployment as a static website on Amazon S3.
```

Add a live demo section:

```markdown
## Live Demo

https://www.break-signal.com/
```

Add a tech stack section:

```markdown
## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- localStorage
- Web Audio API
- Browser Notifications API
- AWS S3 Static Website Hosting
```

Add a future upgrade section:

```markdown
## Future AWS Upgrade Path

This project can later be upgraded with:

- Amazon CloudFront for CDN delivery
- Origin Access Control to keep the S3 bucket private
- AWS Certificate Manager for HTTPS
- Route 53 for custom domain DNS
- Terraform for infrastructure as code
```

Also update the GitHub repository metadata:

- Add a short repository description
- Add the live website URL
- Add topics such as:
  - html
  - css
  - javascript
  - aws-s3
  - static-website
  - localstorage
  - web-audio-api
  - browser-notifications

---

# Priority 2: Format the Code Properly

Make all code readable and portfolio-friendly.

Do not keep CSS or JavaScript compressed into one long line.

Use clean indentation.

Use clear spacing.

Use beginner-friendly comments.

Avoid clever code.

Readable code is more impressive for this project than short code.

Separate the JavaScript into clear sections:

```javascript
// State
// DOM Elements
// Default Settings
// Timer Functions
// Break Modal Functions
// Notification Functions
// Sound Functions
// History Functions
// localStorage Functions
// Event Listeners
// Initialization
```

Use clear function names:

```javascript
startTimer()
pauseTimer()
resetTimer()
showBreakModal()
completeBreak()
skipBreak()
snoozeBreak()
saveSettings()
loadSettings()
renderHistory()
playAlertSound()
requestNotificationPermission()
```

---

# Priority 3: Fix Ghost Features

Review the live UI and the code.

Any feature that appears in the interface must actually work.

Check these areas carefully:

- Custom prompts
- Reset defaults
- Break type selection
- Notification permission
- Sound toggle
- Clear history
- Daily break counter
- Snooze
- Skip
- Done
- Start
- Pause
- Reset

Important rule:

If a feature appears in the UI, it must work.

If it does not work, either fully implement it or remove it from the UI until it is ready.

Do not leave ghost features.

---

# Priority 4: Add Custom Break Messages

Add a simple custom message system.

Each break type should have a default message:

```javascript
const defaultBreakMessages = {
  eye: "Look at something far away for 20 seconds. Let your eyes soften.",
  stretch: "Stand up, open your chest, roll your shoulders, and breathe.",
  walking: "Take a short walk. Let your body reset before returning.",
  posture: "Relax your shoulders, align your neck, and place both feet on the floor."
};
```

The user should be able to edit the message for each break type.

Custom messages should save in localStorage.

Add a button called:

```text
Reset default messages
```

When clicked, it should restore the default messages.

Keep the UI simple.

Do not overbuild it.

---

# Priority 5: Improve User Experience

Add small but professional UX improvements.

The app should show:

- Current timer status
- Next selected break type
- Notification permission status
- Empty history message when there are no breaks yet
- Clear disabled states for buttons

Suggested timer statuses:

- Ready
- Running
- Paused
- Break active
- Snoozed

Button behavior:

- Disable Start while the timer is already running
- Disable Pause when the timer is not running
- Reset should return the timer to the selected interval
- Clear history should ask for confirmation

Example confirmation:

```javascript
const confirmed = confirm("Clear all break history?");
```

Only clear the history if the user confirms.

---

# Priority 6: Improve Break History

The break history should be simple, useful, and readable.

Each history item should show:

- Break type
- Action
- Time
- Date

Supported actions:

- Completed
- Skipped
- Snoozed

Example history item:

```text
Eye Break completed at 14:35
```

Limit the history to the latest 20 or 30 entries.

Save history in localStorage.

Add an empty state:

```text
No breaks logged yet. Start a session to build your recovery rhythm.
```

---

# Priority 7: Improve Visual Polish

Keep the current dark futuristic style.

Improve the design with:

- Better spacing
- Cleaner button states
- More consistent card sizes
- Softer borders
- Subtle hover effects
- Clear focus states
- Better mobile layout
- More readable typography

Recommended color direction:

- Background: deep navy or near-black
- Cards: transparent dark glass
- Accent: cyan, blue, or soft green
- Text: white or light gray
- Muted text: gray-blue
- Borders: subtle transparent white

Avoid:

- Childish colors
- Heavy animations
- Too many glowing effects
- Cluttered layouts

The app should feel calm, premium, and focused.

---

# Priority 8: Improve Accessibility

Add basic accessibility improvements.

Use semantic HTML where possible.

Use real button elements for actions.

Add aria-label attributes where needed.

Make focus states visible.

Make text contrast strong enough.

Do not rely only on color to communicate status.

For the break reminder modal, use:

```html
role="dialog"
aria-modal="true"
```

The app does not need advanced accessibility, but it should be respectable and professional.

---

# Priority 9: Improve Mobile Layout

Make sure the app works well on:

- Desktop
- Tablet
- Mobile

On mobile:

- Cards should stack vertically
- Buttons should be easy to tap
- Countdown should stay large but not overflow
- Settings should be readable
- History should not feel cramped
- Modal should fit the screen cleanly

Use CSS media queries.

Do not use external frameworks.

---

# Priority 10: Add AWS Portfolio Notes

Add a README section explaining why this project is useful for AWS practice.

Mention:

- Static website hosting
- Amazon S3 bucket hosting
- Custom domain
- Browser-only app
- No backend required
- Low-cost deployment
- Future CloudFront upgrade
- Future Terraform upgrade

Suggested text:

```markdown
## AWS Deployment

BreakSignal is designed as a static website that can be hosted on Amazon S3. Since the app runs fully in the browser and uses localStorage for persistence, it does not require a backend server or database.

This makes it a beginner-friendly AWS portfolio project because it demonstrates static hosting, browser-side state management, and a clean deployment path.
```

Add another section:

```markdown
## Future Cloud Architecture

A more production-ready version could use:

- Amazon S3 as a private origin
- Amazon CloudFront as the CDN
- Origin Access Control to protect the bucket
- AWS Certificate Manager for HTTPS
- Route 53 for DNS
- Terraform to manage the infrastructure
```

---

# Recommended Upgrade Order

Do the upgrades in this order:

1. Improve README.md
2. Format style.css
3. Format script.js
4. Fix ghost features
5. Add custom break messages
6. Improve UX states
7. Improve break history
8. Improve mobile layout
9. Improve accessibility
10. Add AWS portfolio notes

This order gives the biggest portfolio improvement fastest.

---

# Final Upgrade Checklist

Before calling the project polished, confirm that:

- README is complete
- Live demo link is visible on GitHub
- Repository description is added
- Repository topics are added
- CSS is formatted
- JavaScript is formatted
- Code has helpful comments
- No ghost features remain
- Custom messages work
- Settings save correctly
- History saves correctly
- Clear history asks for confirmation
- Notification permission works
- Sound alert works
- Mobile layout looks good
- Modal works cleanly
- Accessibility basics are covered
- AWS deployment section exists
- Future CloudFront section exists
- Future Terraform section exists

---

# Definition of Done

The upgraded project is complete when BreakSignal feels like a finished portfolio app, not just a coding exercise.

It should be:

- Clean
- Calm
- Useful
- Readable
- Mobile-friendly
- Browser-only
- AWS-ready
- Easy to explain in an interview

The final result should show practical front-end skill, basic browser API knowledge, localStorage usage, and AWS static website deployment understanding.
