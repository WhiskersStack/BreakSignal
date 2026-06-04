# BreakSignal Privacy Policy Draft

Last updated: June 4, 2026

This draft covers the BreakSignal Android app and website/PWA. It must be reviewed, assigned a public support contact, and hosted at a stable public URL before a Google Play release.

## Overview

BreakSignal is a local-first productivity tool that reminds users to pause for eye rest, stretching, walking, posture awareness, and focus resets. BreakSignal is not a medical device and does not provide medical advice.

## Data Stored Locally

BreakSignal stores the following information locally in the browser or Android WebView:

- Reminder interval and snooze duration
- Enabled break types and selected preset
- Theme and compact-mode preferences
- Sound preference and volume
- Browser notification preference, where supported
- Daily break counts, focus streak, and recent break history

This information is stored using `localStorage`. BreakSignal does not send this information to a BreakSignal server because the project has no backend or account system.

On Android, app backup is disabled so BreakSignal's local app data is not included in Android backup by the app.

## Data Collection And Sharing

The current BreakSignal code does not:

- Create user accounts
- Collect or share personal data
- Use analytics or advertising SDKs
- Sell user data
- Use a backend database
- Send app data to external APIs
- Access location, contacts, camera, microphone, or health sensors

The hosted website may be served by an infrastructure provider that processes standard connection information, such as IP address, browser details, and request logs, under that provider's own policies. Selecting an external link, such as the GitHub link on the website, is also subject to that external service's privacy policy.

## Notifications And Sound

The website/PWA can request browser notification permission only after the user enables notifications. Notifications are used only for break reminders.

The current Android app does not use a native notification plugin and hides the browser notification control. Alert sounds are generated locally with the Web Audio API; no external audio files are requested.

## Data Retention And User Control

Local settings and history remain until the user:

- Clears history inside BreakSignal
- Clears browser or app data
- Uninstalls the Android app
- Uses browser or operating-system controls that remove local storage

BreakSignal cannot recover local data after it is removed because it has no account system or server-side copy.

## Children

BreakSignal is a general productivity tool and is not specifically directed to children.

## Policy Changes

This policy must be updated if BreakSignal adds accounts, analytics, advertising, external APIs, native notifications, cloud storage, or any other data-processing feature.

## Contact

TODO before release: add a monitored public support email address and the final hosted privacy policy URL.
