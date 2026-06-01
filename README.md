# BreakSignal

BreakSignal is a minimal static web app that helps users protect their eyes, posture, and focus by reminding them to take healthy breaks while working at a computer.

The app runs entirely in the browser using plain HTML, CSS, and JavaScript. It saves settings and break history with localStorage and is designed for deployment as a static website on Amazon S3.

## Live Demo

https://www.break-signal.com/

## Screenshots

### Dashboard

![BreakSignal dashboard](assets/screenshots/breaksignal-dashboard.png)

### Settings

![BreakSignal settings](assets/screenshots/breaksignal-settings.png)

### Break Reminder Modal

![BreakSignal break reminder modal](assets/screenshots/breaksignal-modal.png)

### Mobile Layout

![BreakSignal mobile layout](assets/screenshots/breaksignal-mobile.png)

## Features

- Countdown break reminder timer
- Eye, stretch, walking, and posture break rotation
- 20-20-20 eye break preset
- Custom reminder intervals and snooze duration
- Rotating built-in break messages
- Browser-generated alert tones with grouped tone presets and volume control
- Optional browser notifications
- Progressive Web App install support
- Compact timer mode
- Daily completed-break counter with break-type breakdown
- Focus rhythm streak counter
- Recent break history saved locally
- Responsive dark futuristic interface

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- localStorage
- Web Audio API
- Browser Notifications API
- Service Worker API
- AWS S3 Static Website Hosting

## Architecture

BreakSignal is a fully static browser app.

The app uses:

- HTML for structure
- CSS for layout and styling
- Vanilla JavaScript for timer logic, browser notifications, sound alerts, settings, and history
- localStorage for saving user preferences and recent activity
- A web manifest and service worker for install support and offline app-shell caching

No backend, database, authentication, or external API is required.

## How The App Works

BreakSignal runs a timer while the browser tab is open. When the timer reaches zero, it opens a break reminder modal with the next enabled break type. The user can mark the break as completed, snooze it, or skip it.

The app does not require a backend, database, account, or external API. Closing the tab stops the timer, but preferences and recent activity stay saved in the browser.

## localStorage

BreakSignal uses localStorage to save:

- Reminder interval
- Snooze duration
- Enabled break types
- Selected preset
- Compact mode preference
- Sound tone and volume
- Notification preference
- Daily break count and break-type stats
- Focus rhythm streak
- Recent break history

## Browser APIs

### Web Audio API

Alert tones are generated in the browser with the Web Audio API. No external audio files are loaded.

### Browser Notifications API

Users can optionally enable browser notifications. Permission is requested only when the notification toggle is enabled.

### Progressive Web App

BreakSignal includes a web manifest, install icons, and a service worker. Supported browsers can install it as a standalone app while keeping all data local to the browser.

## Project Structure

```text
BreakSignal/
|-- assets/
|   |-- icons/
|   `-- screenshots/
|-- index.html
|-- style.css
|-- script.js
|-- manifest.webmanifest
|-- service-worker.js
|-- logo.svg
|-- og-image.png
|-- robots.txt
|-- sitemap.xml
`-- README.md
```

## AWS Deployment

BreakSignal is designed as a static website that can be hosted on Amazon S3. Since the app runs fully in the browser and uses localStorage for persistence, it does not require a backend server or database.

This makes it a beginner-friendly AWS portfolio project because it demonstrates static hosting, browser-side state management, and a clean deployment path.

Basic deployment steps:

1. Create an S3 bucket.
2. Enable static website hosting.
3. Upload the static files.
4. Set `index.html` as the index document.
5. Configure public access for simple testing.
6. Point a custom domain at the hosted site when ready.

## AWS Hosting Model

Current hosting model:

```text
User Browser -> Amazon S3 Static Website Hosting -> HTML/CSS/JS
```

Future production model:

```text
User Browser -> CloudFront -> Private S3 Bucket
```

Optional future infrastructure:

- Route 53 for DNS
- AWS Certificate Manager for HTTPS
- CloudFront Origin Access Control
- Terraform for infrastructure as code

## Future AWS Upgrade Path

This project can later be upgraded with:

- Amazon CloudFront for CDN delivery
- Origin Access Control to keep the S3 bucket private
- AWS Certificate Manager for HTTPS
- Route 53 for custom domain DNS
- Terraform for infrastructure as code

## Future Cloud Architecture

A more production-ready version could use:

- Amazon S3 as a private origin
- Amazon CloudFront as the CDN
- Origin Access Control to protect the bucket
- AWS Certificate Manager for HTTPS
- Route 53 for DNS
- Terraform to manage the infrastructure

## Version

1.0.0

## What Was Learned

- Building a useful app with only static files
- Managing browser-side state with localStorage
- Using the Web Audio API for generated sounds
- Handling Browser Notifications API permissions
- Designing responsive UI without a framework
- Preparing a static front-end project for AWS hosting
